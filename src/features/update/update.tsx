import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateUserInfo } from "./action"
import {
  selectFirstName,
  selectLastName,
  selectUpdateSuccess,
  selectUpdateError,
} from "./selectors"

interface UserUpdateProps {
  onClose: () => void //  fonction ne renvoyant rien
}

function UserUpdate({ onClose }: UserUpdateProps) {
  const dispatch = useDispatch()
  const firstName = useSelector(selectFirstName)
  const lastName = useSelector(selectLastName)
  const updateSuccess = useSelector(selectUpdateSuccess)
  const updateError = useSelector(selectUpdateError)

  const [newFirstName, setNewFirstName] = useState(firstName)
  const [newLastName, setNewLastName] = useState(lastName)
  const [isModalOpen, setIsEditing] = useState(true)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const closeModal = () => {
    setIsEditing(false)
    setShowSuccessMessage(false)
    setShowErrorMessage(false)
    onClose() // Appele la fonction onClose pour mettre à jour isEditing dans le composant User
  }

  const handleSaveClick = async () => {
    dispatch(updateUserInfo(newFirstName, newLastName) as any)
    if (updateSuccess) {
      setShowSuccessMessage(true)
      // Ferme la modale automatiquement après un délai
      setTimeout(() => {
        setShowSuccessMessage(false)
        closeModal()
      }, 2000)
    } else if (updateError) {
      setShowErrorMessage(true)
    }
  }

  // Utilise useEffect pour détecter les changements dans firstName et lastName
  useEffect(() => {
    setNewFirstName(firstName)
    setNewLastName(lastName)
  }, [firstName, lastName])

  // utilise touche entree et echap pour enregistrer/fermer
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault()
      closeModal()
    } else if (e.key === "Enter") {
      e.preventDefault()
      handleSaveClick()
    }
  }

  return (
    // Utilise la variable d'état isModalOpen pour gérer la visibilité de la fenêtre modale
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

          {showSuccessMessage && (
            <label className="success-notification">
              La mise à jour a réussi !
            </label>
          )}

          {showErrorMessage && (
            <div className="error-notification">
              Échec de la mise à jour : {updateError}
            </div>
          )}
        </form>
      </div>
    )
  )
}

export default UserUpdate
