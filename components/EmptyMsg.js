import { useTranslation } from 'next-i18next'
import React from 'react'
import { TbMoodEmpty } from 'react-icons/tb'

function EmptyMsg() {
  const { t } = useTranslation()

  return (
    <div className="empty-msg">
      <TbMoodEmpty />
      {t('inventory.nothing_to_display')}
    </div>
  )
}

export default EmptyMsg
