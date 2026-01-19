// Mapeamento de strings para componentes de ícones do Lucide React
import * as Icons from 'lucide-react'

export const getIcon = (iconName) => {
  const IconComponent = Icons[iconName] || Icons.Award
  return IconComponent
}
