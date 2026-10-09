import React from 'react';

export default function DeliveryDetailsForm({
  formData,
  onChange,
  onSubmit,
  onSaveToast,
  fulfilmentType,
  setFulfilmentType,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSaveToast) {
      onSaveToast();
    }
  };

  return (
    <div className="panel-white">
      <div className="panel-header">
        <div>
          <div className="panel-meta">PATRON COORDINATES</div>
          <h3 className="panel-title">Delivery & Contact Details</h3>
          <p className="panel-caption">
            Our front-of-house concierge coordinates dispatch and dining hand-off.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid-2">
          <div>
            <label className="form-label" htmlFor="fullName">Full name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="form-input"
              value={formData.fullName}
              onChange={onChange}
              placeholder="e.g. Alexander Wright"
              required
            />
          </div>

          <div>
            <label className="form-label" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={onChange}
              placeholder="e.g. alexander.w@example.com"
              required
            />
          </div>
        </div>

        <div className="form-grid-2">
          <div>
            <label className="form-label" htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-input"
              value={formData.phone}
              onChange={onChange}
              placeholder="+94 77 000 0000"
              required
            />
          </div>

          <div>
            <label className="form-label" htmlFor="orderType">Order type</label>
            <select
              id="orderType"
              name="orderType"
              className="form-select"
              value={fulfilmentType}
              onChange={(e) => {
                setFulfilmentType(e.target.value);
                onChange({
                  target: { name: 'orderType', value: e.target.value },
                });
              }}
            >
              <option value="delivery">Delivery (Express)</option>
              <option value="pickup">Curbside Pickup (Free)</option>
              <option value="dinein">Dine-In Pre-Order (Table VIP)</option>
            </select>
          </div>
        </div>

        {fulfilmentType !== 'dinein' && (
          <div className="form-grid-2">
            <div>
              <label className="form-label" htmlFor="address">Street Address</label>
              <input
                type="text"
                id="address"
                name="address"
                className="form-input"
                value={formData.address}
                onChange={onChange}
                placeholder="e.g. 48 Quai de la Tournelle / Galle Road"
                required={fulfilmentType === 'delivery'}
              />
            </div>

            <div>
              <label className="form-label" htmlFor="suite">Apt / Suite / Floor</label>
              <input
                type="text"
                id="suite"
                name="suite"
                className="form-input"
                value={formData.suite}
                onChange={onChange}
                placeholder="e.g. Apt 4B"
              />
            </div>
          </div>
        )}

        <div className="form-full">
          <label className="form-label" htmlFor="deliveryWindow">Preferred Delivery Window</label>
          <input
            type="text"
            id="deliveryWindow"
            name="deliveryWindow"
            className="form-input"
            value={formData.deliveryWindow}
            onChange={onChange}
            placeholder="ASAP (approx 35–45 mins dispatch)"
          />
        </div>

        <div className="form-full">
          <label className="form-label" htmlFor="notes">Message / Chef's Instructions</label>
          <textarea
            id="notes"
            name="notes"
            className="form-textarea"
            rows="3"
            value={formData.notes}
            onChange={onChange}
            placeholder="Please ring building intercom #402. Saffron reduction kept separately warm if possible."
          ></textarea>
        </div>

        <button type="submit" className="btn-update-patron">
          Update Patrons & Dispatch Preferences
        </button>
      </form>
    </div>
  );
}
