export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="state" role="alert">
      <h3>Oops</h3>
      <p>{message}</p>
      {onRetry && <button className="btn btn-outline" onClick={onRetry} style={{ marginTop: '1rem' }}>Try again</button>}
    </div>
  );
}
