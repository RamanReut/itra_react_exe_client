export function discountToString(discount: number): string {
    return Math.trunc(discount * 100).toString() + '%';
}
