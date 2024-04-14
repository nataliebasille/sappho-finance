import { CancelAddButton } from "./cancel-add-button";

export default function ProductsAddPage() {
  return (
    <div className="flex gap-3">
      <div className="form-control flex-1">
        <span className="form-control-label">Product name</span>
        <input type="text" className="form-control-input" />
      </div>

      <div className="form-control flex-initial">
        <span className="form-control-label">Price</span>
        <span className="form-control-prefix">$</span>
        <input
          type="number"
          className="form-control-input"
          inputMode="numeric"
        />
      </div>

      <CancelAddButton />
    </div>
  );
}
