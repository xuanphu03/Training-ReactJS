import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import React from "react";
import { sendStatus } from "../services/UploadStatusServices";

interface FormatState {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  strikethrough: boolean;
}

export default function RichText() {
  const [content, setContent] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const [formatState, setFormatState] = React.useState<FormatState>({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
  });
  const editorRef = React.useRef<HTMLDivElement>(null);
  const email = localStorage.getItem("user") || "guest";

  const updateFormatState = React.useCallback(() => {
    setFormatState({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strikethrough: document.queryCommandState("strikeThrough"),
    });
  }, []);

  const executeCommand = React.useCallback(
    (command: string, value?: string) => {
      document.execCommand(command, false, value);
      if (editorRef.current) {
        editorRef.current.focus();
      }
      updateFormatState();
    },
    [updateFormatState],
  );

  const handleInput = React.useCallback(() => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
      localStorage.setItem("statusContent", editorRef.current.innerHTML);
    }
    updateFormatState();
  }, [updateFormatState]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      // Handle keyboard shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "b":
            e.preventDefault();
            executeCommand("bold");
            break;
          case "i":
            e.preventDefault();
            executeCommand("italic");
            break;
          case "u":
            e.preventDefault();
            executeCommand("underline");
            break;
        }
      }
    },
    [executeCommand],
  );

  React.useEffect(() => {
    if (isOpen && editorRef.current) {
      const saved = localStorage.getItem("statusContent");
      if (saved) {
        editorRef.current.innerHTML = saved;
        setContent(saved);
      }
    }
  }, [isOpen]);

  const ToolbarButton = ({
    onClick,
    isActive = false,
    children,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    children: React.ReactNode;
    title: string;
  }) => (
    <Button
      variant={isActive ? "default" : "ghost"}
      size="sm"
      onClick={onClick}
      title={title}
      className={`h-8 w-8 p-0 ${isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
    >
      {children}
    </Button>
  );

  const handleOpenDialogStatus = () => {
    setIsOpen(true);
  };

  const handleCloseDialogStatus = () => {
    setIsOpen(false);
    setFormatState({
      bold: false,
      italic: false,
      underline: false,
      strikethrough: false,
    });
  };

  const handleUpLoadStatus = () => {
    sendStatus(email, content);
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
    }
    localStorage.removeItem("statusContent");
    setContent("");
    handleCloseDialogStatus();
  };
  return (
    <div className="mx-auto flex max-w-3xl gap-4 rounded-md border p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-3xl font-bold text-white uppercase">
        {email[0]}
      </div>
      <div
        onClick={handleOpenDialogStatus}
        className="flex h-10 flex-1 items-center rounded-2xl bg-slate-200 px-5 font-medium text-slate-700"
      >
        Bạn đang nghĩ gì?
      </div>
      {isOpen && (
        <div
          onClick={handleCloseDialogStatus}
          className="absolute top-0 left-0 z-10 flex h-screen w-screen items-center justify-center bg-black/5"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex h-2/3 basis-1/3 flex-col rounded-md border border-black/30 bg-white text-black shadow-md"
          >
            <div className="relative border-b-2 py-5">
              <h1 className="text-center text-2xl font-medium text-black/70">
                Viết status
              </h1>
              <Button
                variant="ghost"
                className="absolute top-5 right-5 border border-black/30"
                onClick={handleCloseDialogStatus}
              >
                <X />
              </Button>
            </div>
            <div className="flex flex-1 flex-col justify-between gap-3">
              <div className="space-x-2 border-b-2 p-2 font-serif text-lg">
                <ToolbarButton
                  onClick={() => executeCommand("bold")}
                  isActive={formatState.bold}
                  title="Bold (Ctrl+B)"
                >
                  <b>B</b>
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => executeCommand("italic")}
                  isActive={formatState.italic}
                  title="Italic (Ctrl+I)"
                >
                  <i>I</i>
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => executeCommand("underline")}
                  isActive={formatState.underline}
                  title="Underline (Ctrl+U)"
                >
                  <u>U</u>
                </ToolbarButton>

                <ToolbarButton
                  onClick={() => executeCommand("strikeThrough")}
                  isActive={formatState.strikethrough}
                  title="Strikethrough"
                >
                  <s>S</s>
                </ToolbarButton>
              </div>
              <div className="relative flex-1">
                <div
                  ref={editorRef}
                  contentEditable
                  onInput={handleInput}
                  onKeyDown={handleKeyDown}
                  onMouseUp={updateFormatState}
                  onKeyUp={updateFormatState}
                  className="text-foreground bg-background h-full p-6 leading-relaxed focus:outline-none"
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.6",
                  }}
                  suppressContentEditableWarning={true}
                />
                {content === "" && (
                  <div className="pointer-events-none absolute top-6 left-6 text-lg text-gray-400">
                    Bạn đang nghĩ gì?
                  </div>
                )}
              </div>
              <Button className="m-5" onClick={handleUpLoadStatus}>
                Đăng
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
