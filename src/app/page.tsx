"use client";

import { useMemo, useRef, useState } from "react";
import styles from "@/app/style.module.css";

// チェックリスト項目の型定義
type ChecklistItem = {
  id: string;
  category: string;
  title: string;
  description?: string;
  checked: boolean;
};

// CSVエスケープ関数（カンマ/改行/ダブルクォート対応）
const csvEscape = (value: string): string => {
  const needsQuote = /[",\n]/.test(value);
  const escaped = value.replaceAll(`"`, `""`);
  return needsQuote ? `"${escaped}"` : escaped;
};

// テキストファイルダウンロード関数
const downloadTextFile = (
  filename: string,
  content: string,
  mimeType: string = "text/plain;charset=utf-8",
) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// メインコンポーネント
export default function App() {
  // Refs - セクション参照
  const introRef = useRef<HTMLDivElement | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);
  const checklistRef = useRef<HTMLDivElement | null>(null);

  // Memoized - チェックリスト項目
  const checklistItems: ChecklistItem[] = useMemo(
    () => [
      {
        id: "TC-001",
        category: "目的・範囲",
        title: "このスプリントで守るべき品質特性が明確か",
        description: "例：正確性、可用性、操作性、セキュリティなど",
        checked: false,
      },
      {
        id: "TC-002",
        category: "リスク",
        title: "重大リスクとテスト優先度が合意されているか",
        checked: false,
      },
      {
        id: "TC-003",
        category: "自動化",
        title: "自動化対象と粒度（Unit/Integration/E2E）が妥当か",
        checked: false,
      },
    ],
    [],
  );

  // State - チェックリスト項目の状態管理
  const [items, setItems] = useState<ChecklistItem[]>(checklistItems);

  // Function - セクションへのスクロール
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Function - チェックリスト項目のチェック状態を切り替え
  const toggleItemChecked = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  // Function - CSVエクスポート
  const exportCsv = () => {
    const header = ["ID", "カテゴリ", "タイトル", "説明", "チェック状態"];
    const rows = items.map((item) => [
      item.id,
      item.category,
      item.title,
      item.description ?? "",
      item.checked ? "true" : "false",
    ]);
    const csv = [header, ...rows]
      .map((row) => row.map((v) => csvEscape(v)).join(","))
      .join("\n");
    downloadTextFile(
      "test_strategy_checklist.csv",
      csv,
      "text/csv;charset=utf-8",
    );
  };

  // レンダリング
  return (
    <>
      <header className={styles.stickyHeader}>
        <nav className={styles.navRow}>
          <button type="button" onClick={() => scrollToSection(introRef)}>
            概要
          </button>
          <button type="button" onClick={() => scrollToSection(detailRef)}>
            詳細
          </button>
          <button type="button" onClick={() => scrollToSection(checklistRef)}>
            チェックリスト
          </button>
          <button type="button" onClick={exportCsv}>
            CSV出力
          </button>
        </nav>
      </header>
      <main>
        <section ref={introRef} className={styles.section}>
          <h1>テスト戦略</h1>
          <p>
            ここに「テスト戦略の説明（短め）」を入れます。スクロール/クリックで次の説明へ進み、
            最後にチェックリストで確認・CSV出力します。
          </p>
          <button type="button" onClick={() => scrollToSection(detailRef)}>
            次へ（詳細へ）
          </button>
        </section>

        <section ref={detailRef} className={styles.section}>
          <h2>戦略の詳細</h2>
          <p>ここに続きの説明（長文でもOK）を入れます。</p>
          <ul>
            <li>狙い（品質特性/目的）</li>
            <li>スコープ（対象/対象外）</li>
            <li>テストレベル（Unit/Integration/E2E）</li>
            <li>リスクベースの優先度</li>
          </ul>
          <button type="button" onClick={() => scrollToSection(checklistRef)}>
            次へ（チェックリストへ）
          </button>
        </section>

        <section ref={checklistRef} className={styles.section}>
          <h2>チェックリスト</h2>
          <p>以下のチェックリストで戦略を確認してください。</p>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleItemChecked(item.id)}
                  />
                  <strong>
                    {item.id} - {item.title}
                  </strong>{" "}
                  ({item.category})
                  {item.description && <p>{item.description}</p>}
                </label>
              </li>
            ))}
          </ul>
          <button type="button" onClick={exportCsv}>
            CSV出力
          </button>
        </section>
      </main>
    </>
  );
}
