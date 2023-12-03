interface Props {
  colsNum: number;
}

export function Skelton({ colsNum }: Props) {
  return (
    <tr className="pt-4 text-center">
      <td
        colSpan={colsNum}
        className="h-8 bg-slate-400 animate-pulse border-b-1 border-sky-300"
      />
    </tr>
  );
}
