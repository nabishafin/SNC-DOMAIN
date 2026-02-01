import { Check } from 'lucide-react';
import Card, { CardBody, CardFooter } from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

const PricingCard = ({ tld, onSelect, featured = false }) => {
    return (
        <Card
            variant={featured ? 'elevated' : 'default'}
            className={`${featured ? 'ring-2 ring-primary-500 transform scale-105' : ''}`}
        >
            {featured && (
                <div className="bg-primary-600 text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                </div>
            )}

            <CardBody className="pt-6">
                <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <h3 className="text-3xl font-bold text-neutral-900">{tld.extension}</h3>
                        {tld.popular && !featured && (
                            <Badge variant="info" size="sm">
                                Popular
                            </Badge>
                        )}
                    </div>
                    <p className="text-sm text-neutral-600">{tld.name}</p>
                </div>

                <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-primary-600 mb-1">
                        ${tld.pricing.registration}
                    </div>
                    <p className="text-sm text-neutral-500">per year</p>
                </div>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-600">Registration</span>
                        <span className="font-semibold text-neutral-900">
                            ${tld.pricing.registration}
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-600">Renewal</span>
                        <span className="font-semibold text-neutral-900">
                            ${tld.pricing.renewal}
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-600">Transfer</span>
                        <span className="font-semibold text-neutral-900">
                            ${tld.pricing.transfer}
                        </span>
                    </div>
                </div>

                <ul className="space-y-2.5">
                    <li className="flex items-start gap-2 text-sm text-neutral-700">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Free WHOIS privacy</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-neutral-700">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>DNS management</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-neutral-700">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>24/7 support</span>
                    </li>
                </ul>
            </CardBody>

            <CardFooter>
                <Button
                    variant={featured ? 'primary' : 'outline'}
                    size="md"
                    className="w-full"
                    onClick={() => onSelect?.(tld)}
                >
                    Select {tld.extension}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default PricingCard;
