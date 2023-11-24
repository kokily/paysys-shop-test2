import clsx from 'clsx';

import ActiveLink from '../ActiveLink';

interface Props {
  href: string;
  icon: string;
  title: string;
}

export function FooterItem({ href, icon, title }: Props) {
  return (
    <ActiveLink href={href} activeClassName="text-cyan-600">
      <div
        className={clsx(
          'flex flex-col items-center justify-center flex-grow',
          'cursor-pointer overflow-hidden whitespace-nowrap',
          'transition-colors hover:bg-teal-300 min-w-20%',
        )}
      >
        <i className="material-icons">{icon}</i>
        {title}
      </div>
    </ActiveLink>
  );
}
