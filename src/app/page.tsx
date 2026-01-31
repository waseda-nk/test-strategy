"use client";

import { useMemo, useState } from "react";
import styles from "@/app/style.module.css";
import { SideMenu } from "@/components/side-menu";

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
  // ナビゲーション用リスト項目
  const links = [
    {
      key: "introduction",
      title: "Introduction",
      href: "#introduction",
    },
    {
      key: "details",
      title: "Details",
      href: "#details",
    },
    {
      key: "checklist",
      title: "Checklist",
      href: "#checklist",
    },
    {
      key: "export",
      title: "Export CSV",
      href: "#export",
    },
  ];

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
    <div className={styles.grid}>
      <div className={styles.sidebar}>
        <SideMenu links={links} />
      </div>
      <main className={styles.main}>
        <section id={"introduction"} className={styles.section}>
          <h2>はじめに</h2>
          <p>
            このアプリケーションは、テスト戦略を策定する際のチェックリストを提供します。以下のセクションで詳細を確認し、チェックリストを活用してください。
          </p>
          <a href={"details"}>次へ（詳細へ）</a>
        </section>

        <section id={"details"} className={styles.section}>
          <h2>戦略の詳細</h2>
          <p>ここに続きの説明（長文でもOK）を入れます。</p>
          <ul>
            <li>狙い（品質特性/目的）</li>
            <li>スコープ（対象/対象外）</li>
            <li>テストレベル（Unit/Integration/E2E）</li>
            <li>リスクベースの優先度</li>
          </ul>
          <a href={"checklist"}>次へ（チェックリストへ）</a>
        </section>

        <section id={"checklist"} className={styles.section}>
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
        </section>

        <section id={"export"} className={styles.section}>
          <h2>CSVエクスポート</h2>
          <p>チェックリストの内容をCSV形式でエクスポートします。</p>
          <button type="button" onClick={exportCsv}>
            CSVをダウンロード
          </button>
        </section>
      </main>
    </div>
  );
}
