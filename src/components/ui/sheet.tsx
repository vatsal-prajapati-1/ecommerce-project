"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { Portal } from "./portal";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";

type SheetSide = "top" | "right" | "bottom" | "left";
type SheetSize = "sm" | "md" | "lg" | "xl" | "full";

interface SheetContextType {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const SheetContext = createContext<SheetContextType | undefined>(undefined);

const useSheet = () => {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error("Sheet components must be used within a Sheet provider");
  }
  return context;
};

// Main Sheet Provider
interface SheetProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Sheet: React.FC<SheetProps> = ({
  children,
  open = false,
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  return (
    <SheetContext.Provider value={{ isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
};

// Sheet Trigger
interface SheetTriggerProps {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

export const SheetTrigger: React.FC<SheetTriggerProps> = ({
  children,
  asChild = false,
  className = "",
}) => {
  const { onOpenChange } = useSheet();

  const handleClick = () => {
    onOpenChange(true);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: handleClick,
      className: `${
        (children as any).props.className || ""
      } ${className}`.trim(),
    });
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
};

// Sheet Content
interface SheetContentProps {
  children: ReactNode;
  side?: SheetSide;
  size?: SheetSize;
  className?: string;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

export const SheetContent: React.FC<SheetContentProps> = ({
  children,
  side = "right",
  size = "md",
  className = "",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}) => {
  const { isOpen, onOpenChange } = useSheet();
  const focusTrapRef = useFocusTrap(isOpen);

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onOpenChange, closeOnEscape]);

  if (!isOpen) return null;

  const getSizeClasses = () => {
    const sizeMap = {
      sm: side === "left" || side === "right" ? "w-80" : "h-80",
      md: side === "left" || side === "right" ? "w-96" : "h-96",
      lg: side === "left" || side === "right" ? "w-[32rem]" : "h-[32rem]",
      xl: side === "left" || side === "right" ? "w-[48rem]" : "h-[48rem]",
      full: side === "left" || side === "right" ? "w-full" : "h-full",
    };
    return sizeMap[size];
  };

  const getPositionClasses = () => {
    const positionMap = {
      top: "top-0 left-0 right-0",
      right: "top-0 right-0 bottom-0",
      bottom: "bottom-0 left-0 right-0",
      left: "top-0 left-0 bottom-0",
    };
    return positionMap[side];
  };

  const getAnimationClasses = () => {
    const animationMap = {
      top: "data-[state=open]:animate-slide-in-from-top data-[state=closed]:animate-slide-out-to-top",
      right:
        "data-[state=open]:animate-slide-in-from-right data-[state=closed]:animate-slide-out-to-right",
      bottom:
        "data-[state=open]:animate-slide-in-from-bottom data-[state=closed]:animate-slide-out-to-bottom",
      left: "data-[state=open]:animate-slide-in-from-left data-[state=closed]:animate-slide-out-to-left",
    };
    return animationMap[side];
  };

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onOpenChange(false);
    }
  };

  return (
    <Portal>
      <div className="fixed inset-0 z-50">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out"
          data-state={isOpen ? "open" : "closed"}
          onClick={handleOverlayClick}
        />

        {/* Sheet */}
        <div
          ref={focusTrapRef}
          className={`
            fixed bg-white shadow-lg border
            ${getPositionClasses()}
            ${getSizeClasses()}
            ${getAnimationClasses()}
            ${className}
          `}
          data-state={isOpen ? "open" : "closed"}
          role="dialog"
          aria-modal="true"
        >
          {showCloseButton && (
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-100 transition-colors z-10"
              aria-label="Close sheet"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
          {children}
        </div>
      </div>
    </Portal>
  );
};

// Sheet Header
interface SheetHeaderProps {
  children: ReactNode;
  className?: string;
}

export const SheetHeader: React.FC<SheetHeaderProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col space-y-2 text-center sm:text-left p-6 pb-4 ${className}`}
    >
      {children}
    </div>
  );
};

// Sheet Title
interface SheetTitleProps {
  children: ReactNode;
  className?: string;
}

export const SheetTitle: React.FC<SheetTitleProps> = ({
  children,
  className = "",
}) => {
  return (
    <h2 className={`text-lg font-semibold text-gray-900 ${className}`}>
      {children}
    </h2>
  );
};

// Sheet Description
interface SheetDescriptionProps {
  children: ReactNode;
  className?: string;
}

export const SheetDescription: React.FC<SheetDescriptionProps> = ({
  children,
  className = "",
}) => {
  return <p className={`text-sm text-gray-600 ${className}`}>{children}</p>;
};

// Sheet Body
interface SheetBodyProps {
  children: ReactNode;
  className?: string;
}

export const SheetBody: React.FC<SheetBodyProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`flex-1 px-6 py-4 overflow-y-auto ${className}`}>
      {children}
    </div>
  );
};

// Sheet Footer
interface SheetFooterProps {
  children: ReactNode;
  className?: string;
}

export const SheetFooter: React.FC<SheetFooterProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-4 border-t ${className}`}
    >
      {children}
    </div>
  );
};

// Sheet Close
interface SheetCloseProps {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
}

export const SheetClose: React.FC<SheetCloseProps> = ({
  children,
  asChild = false,
  className = "",
}) => {
  const { onOpenChange } = useSheet();

  const handleClick = () => {
    onOpenChange(false);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: handleClick,
      className: `${
        (children as any).props.className || ""
      } ${className}`.trim(),
    });
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
};
