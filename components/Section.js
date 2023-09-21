export default function Section({ title, children }) {
  return (
    <div
      className="nk-widget nk-widget-highlighted ghostkit-reusable-widget"
    >
      <h4 className="nk-widget-title">
        <span>{title}</span>
      </h4>
      {children}
    </div>
  )
}