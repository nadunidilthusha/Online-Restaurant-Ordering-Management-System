export default function Toast({ message }) {
  if (!message) return null;
  return <div className={`toast show ${message.type}`} role="status">{message.text}</div>;
}
