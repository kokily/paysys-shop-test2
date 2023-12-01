interface Props {
  title: string;
}

export function FrontTitle({ title }: Props) {
  return (
    <div className="text-center mb-4">
      <h2 className="text-1xl font-bold">전표 세부내역</h2>
      <small className="text-1xl font-bold text-blue-500">[ {title} ]</small>
    </div>
  );
}
