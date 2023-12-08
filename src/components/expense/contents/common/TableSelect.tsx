import type { ChangeEvent } from 'react';

interface Props {
  title: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  data: {
    value: string;
    title: string;
  }[];
}

export function TableSelect(props: Props) {
  return (
    <tr>
      <th className="ring-1 ring-purple-500 ring-inset">{props.title}</th>
      <td colSpan={3} className="ring-1 ring-red-500 ring-inset">
        <select name={props.name} value={props.value} onChange={props.onChange}>
          {props.data.map((item) => (
            <option key={item.title} value={item.value}>
              {item.title}
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
}
