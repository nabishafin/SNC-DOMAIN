import { isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

/**
 * Log a warning and show a toast on rejected API actions
 */
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        console.warn("We got a rejected action!", action);

        const errorMessage =
            action.payload?.data?.message ||
            action.payload?.message ||
            "An unexpected error occurred. Please try again.";

        // Only show toast if it's not a 401 (which is handled by baseQueryWithReauth)
        if (action.payload?.status !== 401) {
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    return next(action);
};
