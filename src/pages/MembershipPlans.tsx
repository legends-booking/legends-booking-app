import type { Membership, User } from '../types'
import { useState, useEffect } from 'react'
import { getMemberships } from '../api/membershipPlans'
import { NewMembershipPlan } from '../components/NewMembershipPlan'
import { useAuth } from '../context/useAuth'

export function MembershipPlans({user}: {user: User|null}) {
  const [memberships, setMemberships] = useState<Membership[]>([])
  const [loading, setLoading] = useState(true)   
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { status } = useAuth()
  
  useEffect(() => {
    let cancelled = false
    getMemberships()
      .then((data) => { if (!cancelled) setMemberships(data) })
      .catch(() => { if (!cancelled) setError('Failed to fetch memberships') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  },[])

  function membershipImageSrc(image: string) {
    if (image.startsWith('http')) return image
    return `${import.meta.env.VITE_BOOKING_SERVICE_URL}${image}`
  }
  
  return (
  <>
    <main className="landing page catalog" aria-busy={loading}>
        <div className="catalog-header">
          <h1 className="page-heading">Packages</h1>
          {status !== 'loading' && user?.role === 'admin' ? (
            <button type="button" className="cta" onClick={() => setAdding(true)}>
              Add Package
            </button>
          ) : null}
        </div>
        {loading ? (
          <ul className="product-grid" aria-label="Loading packages">
            {[0, 1, 2].map((i) => (
              <li key={i}>
                <div className="placeholder placeholder-product" />
              </li>
            ))}
          </ul>
        ) : 
          error ? (
            <p className="lede">{error}</p>
          ) : memberships.length === 0 ? (
        <p className="lede">No packages yet. Contact club admin.</p>
      ) : (
        <ul className="product-grid">
          {memberships.map((membership) => (
            <li key={membership.id}>
              <article className="product-card">
                {membership.image ? (
                  <img src={membershipImageSrc(membership.image)} alt="" className="product-card-image" />
                ) : (
                  <div className="product-card-image product-card-image-empty" />
                )}
                <div className="product-card-body">
                  <h2>{membership.name}</h2>
                  <p className="product-card-meta">
                    {membership.class_credits ? `${membership.class_credits} credits` : `Unlimited credits`}
                    {membership.duration ? ` · ${membership.duration} days` : null}
                  </p>
                  <p className="product-card-price">{membership.price}</p>
                  {membership.description ? (
                    <p className="product-card-desc">{membership.description}</p>
                  ) : null}
                  
                  
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </main>
  
    {adding ? (
      <>
        <button
          type="button"
          className="overlay"
          aria-label="Close"
          onClick={() => setAdding(false)}
        />
        <div className="drawer drawer-form is-open" role="dialog" aria-modal="true">
          <NewMembershipPlan
            onCreate={(membership) => {
              setMemberships((current) => [membership, ...current])
              setAdding(false)
            }}
            onCancel={() => setAdding(false)}
          />
        </div>
      </>
    ) : null}
  </>
 

    
  )
}