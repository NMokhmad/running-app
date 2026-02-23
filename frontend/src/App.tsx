import { useQuery } from '@tanstack/react-query'

interface HealthResponse {
  status: string
  timestamp: string
}

function App() {
  const { data, isLoading, isError } = useQuery<HealthResponse>({
    queryKey: ['health'],
    queryFn: async () => {
      const res = await fetch('/api/health')
      if (!res.ok) throw new Error('API unreachable')
      return res.json() as Promise<HealthResponse>
    },
  })

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>RunTrack</h1>
      <p>API status: {isLoading ? '⏳ loading...' : isError ? '❌ error' : `✅ ${data?.status}`}</p>
    </main>
  )
}

export default App
