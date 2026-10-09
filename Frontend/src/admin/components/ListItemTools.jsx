// move up / move down / remove buttons used in every editable list
export default function ListItemTools({ index, length, onMove, onRemove }) {
  return (
    <div className="tools">
      <button type="button" onClick={() => onMove(index, -1)} disabled={index === 0} aria-label="Move up">▲</button>
      <button type="button" onClick={() => onMove(index, 1)} disabled={index === length - 1} aria-label="Move down">▼</button>
      <button type="button" className="rm" onClick={() => onRemove(index)} aria-label="Remove">✕</button>
    </div>
  );
}
