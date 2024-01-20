import { clsx } from 'clsx';
import Link from 'next/link';
import { notoThai } from '@/app/components/fonts';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-2 block">
      <ol className={clsx(notoThai.className, 'flex text-sm md:text-base')}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active ? 'text-gray-600' : 'text-gray-400',
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-1 inline-block">
                <KeyboardArrowRightIcon />
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
