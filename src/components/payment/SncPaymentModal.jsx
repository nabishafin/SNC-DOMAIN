import { useEffect, useState } from 'react';
import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt, useChainId, useSwitchChain } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Loader2, AlertCircle, CheckCircle2, Wallet, ArrowRight, X } from 'lucide-react';
import useSncPaymentStore from '../../store/useSncPaymentStore';
import {
    useGetSncNonceMutation,
    useVerifySncWalletMutation,
    useVerifySncPaymentMutation,
    useGetSncPaymentQuery
} from '../../redux/features/payment/paymentApi';
import Button from '../ui/Button';

// Standard ERC20 ABI for Transfer
const erc20Abi = [
  {
    "constant": false,
    "inputs": [
      { "name": "_to", "type": "address" },
      { "name": "_value", "type": "uint256" }
    ],
    "name": "transfer",
    "outputs": [{ "name": "", "type": "bool" }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const SncPaymentModal = () => {
    const { isOpen, paymentData, step, errorMsg, closeModal, setStep, setError, reset } = useSncPaymentStore();
    const { address, isConnected, chain } = useAccount();
    const { open } = useWeb3Modal();
    const { signMessageAsync } = useSignMessage();
    const { writeContractAsync } = useWriteContract();
    const chainId = useChainId();
    const { switchChainAsync } = useSwitchChain();

    const [getNonce, { isLoading: isGettingNonce }] = useGetSncNonceMutation();
    const [verifyWallet, { isLoading: isVerifyingWallet }] = useVerifySncWalletMutation();
    const [verifyPayment, { isLoading: isVerifyingPayment }] = useVerifySncPaymentMutation();
    
    const [txHash, setTxHash] = useState(null);

    // Polling for backend verification
    const { data: paymentStatusData, isFetching: isPolling } = useGetSncPaymentQuery(
        paymentData?.paymentId,
        {
            skip: step !== 'backend_verification_pending' && step !== 'success' && step !== 'failure',
            pollingInterval: step === 'backend_verification_pending' ? 5000 : 0,
        }
    );

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            setTxHash(null);
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Handle payment status polling updates
    useEffect(() => {
        if (paymentStatusData?.success && paymentStatusData?.data) {
            const status = paymentStatusData.data.status;
            if (status === 'SUCCESS') {
                setStep('success');
            } else if (['UNDERPAID', 'WRONG_TOKEN', 'WRONG_RECIPIENT', 'WRONG_NETWORK', 'DUPLICATE', 'EXPIRED', 'FAILED'].includes(status)) {
                setError(`Payment failed: ${paymentStatusData.data.failureReason || status}`);
            }
        }
    }, [paymentStatusData, setStep, setError]);

    if (!isOpen) return null;

    const handleVerifyWallet = async () => {
        if (!isConnected || !address) return open();
        
        try {
            setStep('requesting_nonce');
            const nonceRes = await getNonce({ paymentId: paymentData.paymentId, walletAddress: address }).unwrap();
            
            if (!nonceRes.success) throw new Error(nonceRes.message || 'Failed to get nonce');
            
            setStep('awaiting_signature');
            const signature = await signMessageAsync({ message: nonceRes.data.message });
            
            const verifyRes = await verifyWallet({
                paymentId: paymentData.paymentId,
                walletAddress: address,
                signature
            }).unwrap();

            if (!verifyRes.success) throw new Error(verifyRes.message || 'Failed to verify wallet');
            
            setStep('wallet_verified');
        } catch (err) {
            console.error('Wallet verification error:', err);
            setError(err.message || 'Wallet verification failed');
        }
    };

    const handleSendPayment = async () => {
        try {
            // Check network
            if (chainId !== paymentData.chainId) {
                try {
                    await switchChainAsync({ chainId: paymentData.chainId });
                } catch (e) {
                    throw new Error(`Please switch network to ${paymentData.networkMode} to proceed.`);
                }
            }

            setStep('tx_submitted');
            
            const hash = await writeContractAsync({
                address: paymentData.tokenContractAddress,
                abi: erc20Abi,
                functionName: 'transfer',
                args: [paymentData.receiverWalletAddress, BigInt(paymentData.tokenAmountRaw)],
            });
            
            setTxHash(hash);

            // Notify backend about the tx
            const verifyRes = await verifyPayment({
                paymentId: paymentData.paymentId,
                txHash: hash,
                payerWalletAddress: address,
                chainId: chainId // Send the actual chainId they used
            }).unwrap();

            // The backend verify endpoint returns success: false if the status is TX_PENDING or anything other than SUCCESS.
            // But we shouldn't throw an error if the backend successfully recorded it as pending.
            const status = verifyRes.data?.status;
            if (verifyRes.success || (status === 'TX_PENDING' || status === 'PENDING_VERIFICATION')) {
                if (status === 'SUCCESS') {
                    setStep('success');
                } else {
                    setStep('backend_verification_pending');
                }
            } else {
                setError(verifyRes.message || verifyRes.data?.failureReason || 'Failed to submit transaction to backend');
            }

        } catch (err) {
            console.error('Payment sending error:', err);
            setError(err.shortMessage || err.message || 'Transaction failed');
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl flex flex-col max-h-[90vh] relative">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-neutral-100 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                            <Wallet className="w-4 h-4" />
                        </div>
                        <h3 className="font-bold text-neutral-900 text-lg">SNC Token Payment</h3>
                    </div>
                    {step !== 'tx_submitted' && step !== 'backend_verification_pending' && (
                        <button onClick={() => { reset(); closeModal(); }} className="text-neutral-400 hover:text-neutral-700 transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Body */}
                <div className="p-6 space-y-6 overflow-y-auto">
                    {/* Error State */}
                    {step === 'failure' && (
                        <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-bold text-sm">Payment Error</h4>
                                <p className="text-sm mt-1">{errorMsg}</p>
                                <Button variant="outline" size="sm" className="mt-3 bg-white" onClick={() => setStep('ready')}>Try Again</Button>
                            </div>
                        </div>
                    )}

                    {/* Loading State */}
                    {step === 'loading_request' && (
                        <div className="flex flex-col items-center justify-center py-8 text-neutral-500 space-y-4">
                            <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
                            <p>Initializing payment request...</p>
                        </div>
                    )}

                    {/* Success State */}
                    {step === 'success' && (
                        <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-success-100 text-success-600 flex items-center justify-center">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-neutral-900">Payment Successful!</h3>
                                <p className="text-neutral-500 mt-2">Your payment has been verified. The order will be fulfilled shortly.</p>
                            </div>
                            <Button variant="primary" className="mt-4 w-full" onClick={() => { reset(); closeModal(); window.location.href = '/dashboard'; }}>
                                Go to Dashboard
                            </Button>
                        </div>
                    )}

                    {/* Main Flow States */}
                    {(step === 'ready' || step === 'requesting_nonce' || step === 'awaiting_signature' || step === 'wallet_verified' || step === 'tx_submitted' || step === 'backend_verification_pending') && paymentData && (
                        <>
                            {/* Summary Card */}
                            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-sm text-neutral-500">Domain Registration</span>
                                    <span className="font-bold text-neutral-900">{paymentData.domainName}</span>
                                </div>
                                <div className="h-px bg-neutral-200/50 my-3"></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-neutral-500">Required Amount</span>
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-primary-600">{paymentData.tokenAmountDisplay} {paymentData.tokenSymbol}</div>
                                        <div className="text-xs text-neutral-400">≈ ${paymentData.sourceAmount} {paymentData.sourceCurrency}</div>
                                    </div>
                                </div>
                                <div className="mt-3 text-xs bg-white py-1.5 px-3 rounded-md border border-neutral-100 inline-flex items-center gap-1.5 font-medium text-neutral-600">
                                    <span className="relative flex h-2 w-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-success-500"></span>
                                    </span>
                                    Network: {paymentData.networkMode === 'mainnet' ? 'Ethereum Mainnet' : 'Sepolia Testnet'}
                                </div>
                            </div>

                            {/* Wallet States */}
                            <div className="space-y-4">
                                {isConnected ? (
                                    <div className="bg-primary-50 border border-primary-100 text-primary-900 p-3 rounded-lg flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-success-500"></div>
                                            <span className="font-mono text-xs">{address.slice(0, 6)}...{address.slice(-4)}</span>
                                        </div>
                                        <button onClick={() => open()} className="font-bold hover:underline">Change</button>
                                    </div>
                                ) : (
                                    <Button variant="outline" className="w-full" onClick={() => open()}>Connect Wallet</Button>
                                )}

                                {/* Step Actions */}
                                {isConnected && step === 'ready' && (
                                    <Button 
                                        variant="primary" 
                                        className="w-full" 
                                        onClick={handleVerifyWallet}
                                    >
                                        Verify Wallet
                                    </Button>
                                )}

                                {(step === 'requesting_nonce' || step === 'awaiting_signature') && (
                                    <div className="flex items-center justify-center gap-3 py-3 text-primary-600 font-medium">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Please sign the message in your wallet...</span>
                                    </div>
                                )}

                                {step === 'wallet_verified' && (
                                    <Button 
                                        variant="primary" 
                                        className="w-full h-12 shadow-lg shadow-primary-500/20" 
                                        onClick={handleSendPayment}
                                    >
                                        Pay {paymentData.tokenAmountDisplay} {paymentData.tokenSymbol}
                                    </Button>
                                )}

                                {(step === 'tx_submitted' || step === 'backend_verification_pending') && (
                                    <div className="text-center py-4 space-y-4">
                                        <div className="inline-flex w-12 h-12 rounded-full bg-primary-50 items-center justify-center">
                                            <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-neutral-900">Verifying Transaction</h4>
                                            <p className="text-sm text-neutral-500 mt-1">Please wait while we confirm your payment on the blockchain.</p>
                                        </div>
                                        {txHash && (
                                            <a 
                                                href={`${paymentData.explorerBaseUrl}/tx/${txHash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs font-medium text-primary-600 hover:text-primary-700 inline-flex items-center gap-1 mt-2"
                                            >
                                                View on Explorer <ArrowRight className="w-3 h-3" />
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SncPaymentModal;
