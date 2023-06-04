function useReader() {
  return (blob) => {
    const url = URL.createObjectURL(blob);
    return { url: url, blob: blob };
  };
}

export default useReader;
