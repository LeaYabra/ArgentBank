import { useSelector } from "react-redux"
import { RootState } from "../../app/store"

function UserUpdate() {
  const { firstName, lastName } = useSelector((state: RootState) => state.info)

  return (
    <div className="modal-background">
      <form className="modal-content">
        <span className="close">&times;</span>
        <p className="modal-title">Modifier mes informations</p>

        <div className="form-edit">
          <label className="form-label">Nom:</label>
          <input
            className="form-input"
            type="text"
            value={lastName}
            onChange={(e) => {
              /* Mettre à jour l'état du formulaire */
            }}
          />
        </div>

        <div className="form-edit">
          <label className="form-label">Prénom:</label>
          <input
            className="form-input"
            type="text"
            value={firstName}
            onChange={(e) => {
              /* Mettre à jour l'état du formulaire */
            }}
          />
        </div>

        <div className="button-row">
          <button type="button" className="cancel-button">
            Annuler
          </button>
          <button type="submit" className="save-button">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  )
}

export default UserUpdate
