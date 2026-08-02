// Jednostavan renderer za Miine poruke: ## naslov, • lista, **podebljano**

function renderInline(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return (
        <strong key={`${keyPrefix}-${i}`} className="font-semibold text-foreground">
          {p.slice(2, -2)}
        </strong>
      );
    }
    return <span key={`${keyPrefix}-${i}`}>{p}</span>;
  });
}

export function RichText({ text }: { text: string }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5 text-sm leading-relaxed text-foreground/90">
      {lines.map((line, i) => {
        const key = `l-${i}`;
        if (line.startsWith('## ')) {
          return (
            <p key={key} className="text-[15px] font-semibold text-foreground pt-0.5">
              {renderInline(line.slice(3), key)}
            </p>
          );
        }
        if (line.startsWith('• ')) {
          return (
            <div key={key} className="flex gap-2 pl-0.5">
              <span className="text-primary select-none">•</span>
              <span>{renderInline(line.slice(2), key)}</span>
            </div>
          );
        }
        if (line.trim() === '') return <div key={key} className="h-1" />;
        return <p key={key}>{renderInline(line, key)}</p>;
      })}
    </div>
  );
}
