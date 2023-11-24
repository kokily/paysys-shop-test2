import type { ReactElement } from 'react';
import { Children, cloneElement } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  href: string;
  activeClassName: string;
  children: ReactElement;
}

export default function ActiveLink({ ...rest }: Props) {
  const path = usePathname();
  const child = Children.only(rest.children);
  let className: string = child.props.className || '';

  if (path === rest.href && rest.activeClassName) {
    className = `${className} ${rest.activeClassName}`.trim();
  }

  return (
    <Link className="flex w-full h-full" href={rest.href} passHref={true}>
      {cloneElement(child, { className })}
    </Link>
  );
}
