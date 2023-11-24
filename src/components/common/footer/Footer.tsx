import clsx from 'clsx';
import { FooterItem } from './FooterItem';

export function Footer() {
  return (
    <footer className="flex flex-col items-center print:hidden">
      <div
        className={clsx(
          'flex fixed w-full max-w-3xl h-16',
          'bg-white bottom-0 overflow-x-auto shadow-custom',
        )}
      >
        <FooterItem href="/soldier" icon="military_tech" title="현 역" />
        <FooterItem href="/reserve" icon="camera_enhance" title="예비역" />
        <FooterItem href="/general" icon="face" title="일 반" />
        <FooterItem href="/cart" icon="shopping_cart" title="전표확인" />
        <FooterItem href="/fronts" icon="receipt_long" title="빌지목록" />
      </div>
    </footer>
  );
}
