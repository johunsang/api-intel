"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useToastStore } from "@/store/toast-store";
import { formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog } from "@/components/ui/dialog";

export function ProfileTab() {
  const { user, logout } = useAuthStore();
  const { addToast } = useToastStore();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!user) return null;

  const handleSaveName = () => {
    if (name.trim()) {
      addToast("success", "이름이 변경되었습니다.");
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveName();
    }
    if (e.key === "Escape") {
      setName(user.name);
      setIsEditing(false);
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteDialog(false);
    logout();
    addToast("info", "회원 탈퇴가 완료되었습니다.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-hover">
          <User className="h-8 w-8 text-text-secondary" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {isEditing ? (
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleSaveName}
                className="max-w-xs"
                autoFocus
              />
            ) : (
              <>
                <span className="text-lg font-semibold text-foreground">
                  {user.name}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  수정
                </Button>
              </>
            )}
          </div>
          <p className="text-sm text-text-secondary">{user.email}</p>
        </div>
      </div>

      <div className="space-y-3 rounded-lg border border-border bg-surface p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">가입일</span>
          <span className="text-sm text-foreground">
            {formatDate(user.joinedAt)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary">로그인 방식</span>
          <span className="text-sm text-foreground">GitHub</span>
        </div>
      </div>

      <div className="border-t border-border pt-6">
        <Button
          variant="ghost"
          className="text-danger hover:text-danger hover:bg-danger/10"
          onClick={() => setShowDeleteDialog(true)}
        >
          회원 탈퇴
        </Button>
      </div>

      <Dialog
        open={showDeleteDialog}
        title="회원 탈퇴"
        description="정말 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없으며 모든 데이터가 삭제됩니다."
        confirmLabel="탈퇴"
        cancelLabel="취소"
        onConfirm={handleDeleteAccount}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </div>
  );
}
