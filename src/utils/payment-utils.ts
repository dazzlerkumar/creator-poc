export function formatAmount(amountInPaise: number, currency: string, isAmountInPaise: boolean = false): string {
    const amount = isAmountInPaise ? amountInPaise / 100 : amountInPaise;
    if (currency === "INR") return `₹${amount.toLocaleString("en-IN")}`;
    if (currency === "USD") return `$${amount.toLocaleString("en-US")}`;
    return `${currency} ${amount}`;
}
export function calculateDiscountPercentage(originalAmount: number | null, discountedAmount: number | null) {
    if (discountedAmount === null) return 0;
    if (originalAmount === null) return 0;
    return (((originalAmount - discountedAmount) / originalAmount) * 100).toFixed(0);
}