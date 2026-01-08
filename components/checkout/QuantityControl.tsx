// @/components/checkout/QuantityControl.tsx
'use client';
interface QuantityControlProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

const QuantityControl = ({ 
  quantity, 
  onIncrease, 
  onDecrease, 
  min = 1, 
  max = 99 
}: QuantityControlProps) => {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        className="h-7 w-7 rounded-full border border-amber-300 bg-white text-amber-700 hover:bg-amber-50 disabled:opacity-40"
      >
        -
      </button>
      <span className="min-w-[2rem] text-center font-medium">{quantity}</span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        className="h-7 w-7 rounded-full border border-amber-300 bg-white text-amber-700 hover:bg-amber-50 disabled:opacity-40"
      >
        +
      </button>
    </div>
  );
};
export default QuantityControl;