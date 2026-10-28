import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { ImagePlus, Loader2, X } from 'lucide-react'
import { Overlay } from './Overlay'
import { Thumb, Toggle } from './Parts'
import { CATEGORIES, DIFFICULTIES, ENTITY, emptyRecipe, recipeSchema } from '../data/schema'

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }
const rise = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } } }

const Err = ({ id, error }) => error && <p id={id} role="alert" className="mt-1.5 px-2 text-xs font-medium text-cherry">{error.message}</p>

export function EntityForm({ item, onSubmit, onClose }) {
  const editing = !!item
  const { register, control, handleSubmit, watch, setValue, formState: { errors, isValid, isSubmitting, isDirty } } = useForm({
    resolver: zodResolver(recipeSchema), mode: 'onChange',
    defaultValues: item ? { ...item } : emptyRecipe,
  })
  const [tagDraft, setTagDraft] = useState('')
  const fileRef = useRef(null)
  const image = watch('imageUrl')
  const description = watch('description') || ''

  const onFile = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.size > 1_500_000) return alert('Please choose an image under 1.5 MB.')
    const reader = new FileReader()
    reader.onload = () => setValue('imageUrl', reader.result, { shouldValidate: true, shouldDirty: true })
    reader.readAsDataURL(f)
  }

  const addTag = (tags, onChange) => {
    const t = tagDraft.trim().toLowerCase().replace(/\s+/g, '-').replace(/^#/, '')
    if (t && !tags.includes(t) && tags.length < 6) onChange([...tags, t])
    setTagDraft('')
  }

  return (
    <Overlay label={editing ? `Edit ${ENTITY.lower}` : `Add ${ENTITY.lower}`} onClose={onClose} width="max-w-xl" dismissable={!isSubmitting}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex min-h-0 flex-1 flex-col">
        <header className="flex items-start justify-between border-b border-cherry-tint px-7 py-6">
          <div>
            <p className="label-caps text-cherry">{editing ? 'Editing' : 'New entry'}</p>
            <h2 className="text-4xl leading-none">{editing ? <>Edit <span className="italic-accent">{ENTITY.lower}</span></> : <>Add a <span className="italic-accent">{ENTITY.lower}</span></>}</h2>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className="btn-ghost grid h-10 w-10 place-items-center rounded-full"><X className="h-5 w-5" /></button>
        </header>

        <motion.div variants={stagger} initial="hidden" animate="show" className="scroll-thin flex-1 space-y-5 overflow-y-auto px-7 py-6">
          <motion.div variants={rise} className="relative">
            <input data-autofocus id="name" placeholder=" " className="peer field" aria-invalid={!!errors.name} aria-describedby="name-err" {...register('name')} />
            <label htmlFor="name" className="field-label">Recipe name</label>
            <Err id="name-err" error={errors.name} />
          </motion.div>

          <motion.div variants={rise} className="grid grid-cols-2 gap-4">
            <div className="relative">
              <select id="category" className="peer field cursor-pointer appearance-none" aria-invalid={!!errors.category} {...register('category')}>
                <option value="" disabled hidden></option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <label htmlFor="category" className={`pointer-events-none absolute left-4 top-2 text-[11px] font-semibold uppercase tracking-[0.12em] ${errors.category ? 'text-cherry' : 'text-ink/60'}`}>Cuisine</label>
              <Err error={errors.category} />
            </div>
            <div className="relative">
              <input id="cookTime" type="number" inputMode="numeric" min="1" placeholder=" " className="peer field" aria-invalid={!!errors.cookTime} {...register('cookTime')} />
              <label htmlFor="cookTime" className="field-label">Cook time (min)</label>
              <Err error={errors.cookTime} />
            </div>
          </motion.div>

          <motion.fieldset variants={rise}>
            <legend className="label-caps mb-2 px-1 text-ink/60">Difficulty</legend>
            <div className="grid grid-cols-3 gap-2 rounded-full border border-cherry-tint bg-cream-warm p-1">
              {DIFFICULTIES.map((d) => (
                <label key={d} className="cursor-pointer">
                  <input type="radio" value={d} className="peer sr-only" {...register('difficulty')} />
                  <span className="block rounded-full py-2 text-center text-sm font-semibold transition peer-checked:bg-cherry peer-checked:text-cream peer-focus-visible:ring-2 peer-focus-visible:ring-cherry">{d}</span>
                </label>
              ))}
            </div>
          </motion.fieldset>

          <motion.div variants={rise} className="relative">
            <textarea id="description" rows={4} maxLength={400} placeholder=" " className="peer field resize-none" aria-invalid={!!errors.description} {...register('description')} />
            <label htmlFor="description" className="field-label">Description</label>
            <span className="absolute bottom-3 right-4 text-[11px] text-ink/50">{description.length}/400</span>
            <Err error={errors.description} />
          </motion.div>

          <motion.div variants={rise} className="rounded-2xl border border-cherry-tint bg-cream-warm p-4">
            <div className="flex gap-4">
              <Thumb src={image} alt="Preview" className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="relative">
                  <input id="imageUrl" placeholder=" " className="peer field" aria-invalid={!!errors.imageUrl} value={image?.startsWith('data:') ? '' : image} onChange={(e) => setValue('imageUrl', e.target.value, { shouldValidate: true, shouldDirty: true })} />
                  <label htmlFor="imageUrl" className="field-label">{image?.startsWith('data:') ? 'Uploaded — or paste a link' : 'Image URL'}</label>
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={onFile} tabIndex={-1} aria-label="Upload image" />
                <button type="button" className="btn btn-outline !px-4 !py-2" onClick={() => fileRef.current?.click()}><ImagePlus className="h-4 w-4" />Upload image</button>
              </div>
            </div>
            <Err error={errors.imageUrl} />
          </motion.div>

          <motion.div variants={rise}>
            <Controller control={control} name="tags" render={({ field }) => (
              <div>
                <label htmlFor="tags" className="label-caps mb-2 block px-1 text-ink/60">Tags <span className="normal-case tracking-normal">(Enter to add)</span></label>
                <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-cherry-tint bg-cream p-2.5 focus-within:border-cherry">
                  {field.value.map((t) => (
                    <span key={t} className="pill bg-cherry-tint text-cherry-deep">#{t}<button type="button" aria-label={`Remove ${t}`} onClick={() => field.onChange(field.value.filter((x) => x !== t))}><X className="h-3 w-3" /></button></span>
                  ))}
                  <input id="tags" value={tagDraft} onChange={(e) => setTagDraft(e.target.value)} placeholder={field.value.length ? '' : 'vegan, quick, summer…'} className="min-w-[8ch] flex-1 bg-transparent px-1 py-1 text-sm outline-none focus-visible:!ring-0"
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(field.value, field.onChange) } else if (e.key === 'Backspace' && !tagDraft) field.onChange(field.value.slice(0, -1)) }}
                    onBlur={() => addTag(field.value, field.onChange)} />
                </div>
                <Err error={errors.tags} />
              </div>
            )} />
          </motion.div>

          <motion.div variants={rise} className="flex items-center justify-between rounded-2xl border border-cherry-tint bg-cream-warm px-4 py-3">
            <div><p className="text-sm font-semibold">Publish immediately</p><p className="text-xs text-ink/60">Drafts stay hidden from your public cookbook.</p></div>
            <Controller control={control} name="published" render={({ field }) => <Toggle checked={field.value} onChange={field.onChange} label="Published" />} />
          </motion.div>
        </motion.div>

        <footer className="flex gap-3 border-t border-cherry-tint px-7 py-5">
          <button type="button" className="btn btn-outline" onClick={onClose} disabled={isSubmitting}>Cancel</button>
          <button type="submit" className="btn btn-primary group flex-1" disabled={!isValid || isSubmitting || (editing && !isDirty)}>
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}{isSubmitting ? 'Saving…' : editing ? 'Save changes' : `Add ${ENTITY.lower}`}
          </button>
        </footer>
      </form>
    </Overlay>
  )
}
