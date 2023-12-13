import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../app/store"
import { updateUserInfo } from "./action"

interface UserUpdateProps {
  onUpdate: (newFirstName: string, newLastName: string) => void
}

function UserUpdate({ onUpdate }: UserUpdateProps) {
  const dispatch = useDispatch()
  const { token } = useSelector((state: RootState) => state.user)
  const { firstName, lastName } = useSelector((state: RootState) => state.info)

  const [newFirstName, setNewFirstName] = useState(firstName)
  const [newLastName, setNewLastName] = useState(lastName)
  const [isModalOpen, setIsEditing] = useState(true)

  const closeModal = () => {
    setIsEditing(false)
  }

  const handleSaveClick = async () => {
    if (token) {
      dispatch(updateUserInfo(token, newFirstName, newLastName) as any)
      closeModal()
      onUpdate(newFirstName, newLastName)
    } else {
      console.error("Le token est null")
    }
  }

  // Utilisez useEffect pour détecter les changements dans firstName et lastName
  useEffect(() => {
    setNewFirstName(firstName)
    setNewLastName(lastName)
  }, [firstName, lastName])

  // Utilisez useEffect pour appeler la fonction de mise à jour quand isModalOpen devient false
  useEffect(() => {
    console.log("update", newFirstName)
    if (!isModalOpen) {
      onUpdate(newFirstName, newLastName)
    }
  }, [isModalOpen, newFirstName, newLastName, onUpdate])

  // utilisez touche entree pour enregistrer
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()

      // Trouver l'index du champ actuel dans le formulaire
      const formElements = Array.from(e.currentTarget.form?.elements || [])
      const currentIndex = formElements.indexOf(e.currentTarget)

      console.log("currentIndex:", currentIndex)
      console.log("formElements.length:", formElements.length)

      if (currentIndex < formElements.length - 1) {
        const nextElement = formElements[currentIndex + 1] as HTMLInputElement
        nextElement.focus()
        console.log("Focus set to next element")
      } else {
        console.log("Handle save and alert...")
        handleSaveClick()
      }
    }
  }
  //utilisez touche echap pour fermer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        closeModal()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isModalOpen])

  return (
    // Utilisez la variable d'état isModalOpen pour gérer la visibilité de la fenêtre modale
    isModalOpen && (
      <div className="modal-background">
        <form className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <p className="modal-title">Modifier mes informations</p>

          <div className="form-edit">
            <label className="form-label">Nom:</label>
            <input
              className="form-input"
              type="text"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="form-edit">
            <label className="form-label">Prénom:</label>
            <input
              className="form-input"
              type="text"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="button-row">
            <button
              type="button"
              className="cancel-button"
              onClick={closeModal}
            >
              Annuler
            </button>
            <button
              type="button"
              className="save-button"
              onClick={handleSaveClick}
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    )
  )
}

export default UserUpdate
