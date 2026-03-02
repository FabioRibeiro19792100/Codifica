import './TranslationTip.css'

function TranslationTip({ children, pt }) {
  return (
    <span className="translation-tip">
      {children}
      <span className="translation-tip-popup">
        <span className="translation-tip-pt">{pt}</span>
      </span>
    </span>
  )
}

export default TranslationTip
