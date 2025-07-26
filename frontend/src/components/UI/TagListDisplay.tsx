import { useEffect, useRef, useState } from "react";

function TagListDisplay({
  tags,
  className = "mb-4",
  maxCharsPerRow = 30, // 每行最大字符數
}: {
  tags: string[];
  className?: string;
  maxCharsPerRow?: number;
}) {
  const [visibleTags, setVisibleTags] = useState<string[]>([]);
  const [hiddenCount, setHiddenCount] = useState(0);

  useEffect(() => {
    let totalChars = 0;
    let visibleCount = 0;

    for (let i = 0; i < tags.length; i++) {
      const tagLength = tags[i].length + 2; // +2 for padding

      if (totalChars + tagLength > maxCharsPerRow) {
        // 如果加上 +N 指示器還有剩餘標籤
        if (i < tags.length - 1) {
          const plusIndicatorLength = `+${tags.length - i}`.length + 2;
          // 檢查是否需要移除最後一個標籤為 +N 讓位
          if (
            totalChars + plusIndicatorLength > maxCharsPerRow &&
            visibleCount > 0
          ) {
            visibleCount--;
          }
        }
        break;
      }

      totalChars += tagLength;
      visibleCount++;
    }

    setVisibleTags(tags.slice(0, visibleCount));
    setHiddenCount(tags.length - visibleCount);
  }, [tags, maxCharsPerRow]);

  if (tags.length === 0) return null;

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-1 sm:gap-2">
        {visibleTags.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center px-2 sm:px-2.5 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-medium rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors duration-200"
          >
            {tag}
          </span>
        ))}

        {hiddenCount > 0 && (
          <span className="inline-flex items-center px-2 sm:px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium rounded-lg">
            +{hiddenCount}
          </span>
        )}
      </div>
    </div>
  );
}

export default TagListDisplay;
