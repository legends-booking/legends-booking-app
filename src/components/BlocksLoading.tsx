export function BlocksLoading({ count = 2 }: { count?: number }) {
    return (
      <>
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="placeholder placeholder-product" />
        ))}
      </>
    )
  }