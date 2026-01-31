import { cx } from "@serendie/ui/css";
import type React from "react";
import styles from "./side-menu.module.css";

export const SideMenuList: React.FC<React.ComponentProps<"ul">> = ({
  className,
  ...props
}) => <ul className={cx(styles.list, className)} {...props} />;

export type SideMenuLinkExtra = { active?: boolean };

export const SideMenuListItemLink: React.FC<
  React.ComponentProps<"a"> & SideMenuLinkExtra
> = ({ className, active, ...props }) => (
  <a className={cx(active && styles.active, className)} {...props} />
);

export type SideMenuLinkProps = {
  title: string;
  href: string;
  isActive?: boolean;
};

export type SideMenuProps = {
  links: SideMenuLinkProps[];
};

export const SideMenu = ({
  links,
  className,
  ...props
}: React.PropsWithChildren<SideMenuProps> & React.ComponentProps<"aside">) => {
  return (
    <aside className={cx(styles.aside, className)} {...props}>
      <SideMenuList>
        {links.map((link, i) => (
          <li key={String(i)}>
            <SideMenuListItemLink
              href={link.href}
              active={link.isActive}
              data-title-length-long={/[[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]{12,}/.test(
                link.title,
              )}
            >
              {link.title}
            </SideMenuListItemLink>
          </li>
        ))}
      </SideMenuList>
    </aside>
  );
};
