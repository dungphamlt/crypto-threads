import type { TableOfContents } from 'fumadocs-core/server';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

interface Props {
  toc: TableOfContents;
}

export const Toc: React.FC<Props> = ({ toc }) => {
  return (
    <nav className="bg-background-light border rounded-lg pb-2 max-w-[280px] w-full">
      <span className="block font-medium p-4 pb-2">Table of contents</span>

      <ul>
        {toc.map((item) => (
          <li
            key={item.url}
            style={{ marginLeft: `${(item.depth - 2) * 16}px` }} // 16px = 1rem = ml-4
            className="p-2 px-4"
          >
            <Link
              href={item.url}
              title={item.title?.toString() ?? ''}
              className="flex items-center gap-2 hover:underline group"
            >
              <ArrowRightIcon className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-opacity shrink-0" />
              <span className="truncate text-sm">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
