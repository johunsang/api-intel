"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useDebounce } from "@/hooks/use-debounce";
import { MOCK_HISTORY } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import { Dialog } from "@/components/ui/dialog";
import { HistoryCard } from "@/components/history/history-card";

const SORT_OPTIONS = [
  { value: "newest", label: "최신순" },
  { value: "oldest", label: "오래된순" },
];

const PAGE_SIZE = 10;

export default function HistoryPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [histories, setHistories] = useState(MOCK_HISTORY);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sort]);

  const filtered = useMemo(() => {
    let list = histories;

    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter(
        (h) =>
          h.query.toLowerCase().includes(q) ||
          h.resultApis.some((api) => api.toLowerCase().includes(q))
      );
    }

    list = [...list].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sort === "newest" ? dateB - dateA : dateA - dateB;
    });

    return list;
  }, [histories, debouncedSearch, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = (id: string) => {
    setDeleteTarget(id);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      setHistories((prev) => prev.filter((h) => h.id !== deleteTarget));
      setDeleteTarget(null);
    }
  };

  const handleClick = (id: string) => {
    router.push(`/query/${id}`);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-foreground">쿼리 이력</h1>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="쿼리 또는 API 이름으로 검색..."
            className="pl-9"
          />
        </div>
        <Select
          options={SORT_OPTIONS}
          value={sort}
          onChange={setSort}
          className="w-full sm:w-36"
        />
      </div>

      {histories.length === 0 ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="text-text-secondary">
            아직 실행한 쿼리가 없습니다
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="text-text-secondary">
            일치하는 이력이 없습니다
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {paginated.map((history) => (
              <HistoryCard
                key={history.id}
                history={history}
                onDelete={handleDelete}
                onClick={handleClick}
              />
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </>
      )}

      <Dialog
        open={deleteTarget !== null}
        title="이력 삭제"
        description="이 쿼리 이력을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        confirmLabel="삭제"
        cancelLabel="취소"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
