export default function Loader({ fullPage = false }) {
  return (
    <div className={`loader ${fullPage ? 'full' : ''}`} role="status" aria-label="Loading">
      <div className="spinner" />
    </div>
  );
}
