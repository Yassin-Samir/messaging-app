function useReader() {
  return (blob) => {
    const url = URL.createObjectURL(blob);
    const { name } = blob;
    return { url, blob, sent: false, name };
  };
}

export default useReader;
