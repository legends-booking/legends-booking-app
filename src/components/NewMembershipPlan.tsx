import { useState, type SubmitEvent } from 'react'
import type { Membership } from '../types'
import {createMembership} from '../api/membershipPlans'

type NewMembershipProps = {
  onCreate: (membership: Membership) => void
  onCancel: () => void
}

export function NewMembershipPlan({ onCreate, onCancel }: NewMembershipProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [price, setPrice] = useState('')
  const [credits, setCredits] = useState('')
  const [duration, setDuration] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormError(null)
    const body = new FormData()
    body.set('name', name.trim())
    body.set('description', description.trim())
    body.set('price', price)
    body.set('credits', credits === '' ? '0' : credits)
    body.set('duration', duration === '' ? '0' : duration)
    if (imageFile) body.set('image', imageFile)

    createMembership(body)
    .then(onCreate)
    .catch((error: Error) => setFormError(error.message))
  }

  function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setImageFile(file)
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1>New Package</h1>
      {formError ? <p className="form-error" role="alert">{formError}</p> : null}
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={onImageChange}
        />
      </div>
      <div className="auth-form-row">
        <div>
          <label htmlFor="price">Price</label>
          <input id="price" type="number" required min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div>
          <label htmlFor="credits">Credits</label>
          <input id="credits" type="number" min="0" value={credits} onChange={(e) => setCredits(e.target.value)} />
        </div>
      </div>
      <div>
        <label htmlFor="duration">Duration (days)</label>
        <input id="duration" type="number" min="1" value={duration} onChange={(e) => setDuration(e.target.value)} />
      </div>
      <button type="submit" className="cta" >Create</button>
      <button type="button" className="drawer-link" onClick={onCancel}>Cancel</button>
    </form>
  )
}