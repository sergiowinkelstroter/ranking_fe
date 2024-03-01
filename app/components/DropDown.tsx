import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const isClickInsideRectagle = (e: MouseEvent, element: HTMLElement) => {
  const r = element.getBoundingClientRect();
  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};

interface DropdownProps {
  children: React.ReactNode;
  items: React.ReactNode;
  header: React.ReactNode;
  position?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  items,
  header,
  position = "bottom-left",
}) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const y_position = position.split("-")[0] || "bottom";
    const x_position = position.split("-")[1] || "left";

    function close() {
      setOpen(false);
    }

    function onScreenResize() {
      setOpen(false);
    }

    if (open) document.addEventListener("click", close);
    window.addEventListener("resize", onScreenResize);

    if (buttonRef.current && dropdownRef.current) {
      const getDropRect = () => dropdownRef.current!.getBoundingClientRect();
      const getButtonRect = () => buttonRef.current!.getBoundingClientRect();

      const buttonRect = getButtonRect();

      dropdownRef.current.style.top = `${buttonRect.bottom}px`;
      dropdownRef.current.style.left = `${buttonRect.left}px`;

      const _drect = getDropRect();
      const _brect = getButtonRect();

      const isOutRight = _drect.left + _drect.width > window.innerWidth;
      const isOutLeft = _brect.left < 0;
      const isOutTop = _brect.top < 0;
      const isOutBottom = _drect.top + _drect.height > window.innerHeight;

      if (x_position === "left") {
        dropdownRef.current.style.left = `${buttonRect.left}px`;
      }
      if (x_position === "right") {
        dropdownRef.current.style.left = `${buttonRect.right - _drect.width}px`;
      }
      if (y_position === "top") {
        dropdownRef.current.style.top = `${buttonRect.top}px`;
      }
      if (y_position === "bottom") {
        dropdownRef.current.style.top = `${buttonRect.bottom}px`;
      }

      if (isOutRight) {
        dropdownRef.current.style.right = "unset";
        dropdownRef.current.style.left =
          window.innerWidth - _drect.width - 20 + "px";
      }
      if (isOutLeft) {
        dropdownRef.current.style.left = "0px";
        dropdownRef.current.style.right = "unset";
      }
      if (isOutTop) {
        dropdownRef.current.style.top = "0px";
        dropdownRef.current.style.bottom = "unset";
      }
      if (isOutBottom) {
        dropdownRef.current.style.top = _brect.top - _drect.height - 10 + "px";
      }
    }
    return function removeListeners() {
      document.removeEventListener("click", close);
      window.removeEventListener("resize", onScreenResize);
    };
  }, [open, position]);

  return (
    <div className="relative">
      <div
        ref={buttonRef}
        onClick={() => {
          setTimeout(() => {
            setOpen(!open);
          }, 0);
        }}
      >
        {children}
      </div>
      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed z-50 my-1 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg"
            onClick={(e) => {
              dropdownRef.current &&
                !isClickInsideRectagle(e as any, dropdownRef.current) &&
                setOpen(false);
            }}
          >
            {header}
            <ul className="py-1" role="none">
              {items}
            </ul>
          </div>,
          document.body
        )}
    </div>
  );
};

interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  onClick = () => {},
  href = "",
}) => {
  const classes =
    "block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer truncate";
  return (
    <li onClick={onClick}>
      {!href && (
        <div className={classes} role="menuitem">
          {children}
        </div>
      )}
      {href && (
        <Link href={href}>
          <a className={classes}>{children}</a>
        </Link>
      )}
    </li>
  );
};
