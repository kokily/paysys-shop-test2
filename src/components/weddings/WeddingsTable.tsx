import type { Wedding } from '@prisma/client';
import { Skelton } from '../common/Skelton';
import clsx from 'clsx';

interface Props {
  weddings: Array<Wedding>;
  onReadWedding: (id: string) => void;
}

export function WeddingsTable({ weddings, onReadWedding }: Props) {
  return (
    <div className="w-full max-w-1200 mt-4 mx-5 my-auto">
      <table className="w-full p-0 mb-6 rounded-sm overflow-hidden">
        <thead className="bg-purple-500 text-white">
          <tr>
            <th className="p-2 text-center">웨딩일자</th>
            <th className="p-2 text-center">웨딩시간</th>
            <th className="p-2 text-center">신랑</th>
            <th className="p-2 text-center">신부</th>
          </tr>
        </thead>

        <tbody>
          {weddings && weddings.length > 0 ? (
            weddings.map((wedding) => (
              <tr key={wedding.id}>
                <td className="p-2 text-center">
                  <strong
                    onClick={() => onReadWedding(wedding.id)}
                    className={clsx(
                      'text-purple-500 transition-colors overflow-hidden',
                      'p-1 rounded-sm cursor-pointer hover:bg-purple-500 hover:text-white',
                    )}
                  >
                    {wedding.weddingAt}
                  </strong>
                </td>
                <td className="p-2 text-center">{wedding.eventAt}</td>
                <td className="p-2 text-center">{wedding.husbandName}</td>
                <td className="p-2 text-center">{wedding.brideName}</td>
              </tr>
            ))
          ) : (
            <>
              {Array.from(Array(40), (_, i) => (
                <Skelton key={i} colsNum={4} />
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}
