function useReader() {
  return (blob) => {
    const url = URL.createObjectURL(blob);
    const { name } = blob;
    return { url, blob, name };
  };
}

export default useReader;
