function TagDisplay({ text }: { text: string }) {
  return (
    <>
      <span className="bg-orange-100 text-orange-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-orange-800/20 dark:text-orange-200">
        {text}
      </span>
    </>
  );
}

export default TagDisplay;
