import { HomeItem } from './HomeItem';

export function Home() {
  return (
    <div className="mt-4 mb-24">
      <div className="grid gap-4 m-4 grid-cols-repeat-8">
        <HomeItem />
      </div>
    </div>
  );
}
