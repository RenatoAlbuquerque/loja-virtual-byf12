import { Button as ButtonMui } from '@mui/material'

export interface IButtonProps {
  children: React.ReactNode
  className?: string
  color?:
  | 'primary'
  | 'inherit'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  disabled?: boolean
  fullWidth?: boolean
  id: string
  size?: 'small' | 'medium' | 'large'
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  variant?: 'text' | 'outlined' | 'contained'
  testId?: object
  style?: React.CSSProperties
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default function Button({
  color = 'primary',
  children,
  className,
  disabled,
  fullWidth,
  id,
  size = 'medium',
  startIcon,
  endIcon,
  variant = 'contained',
  testId,
  style,
  onClick
}: IButtonProps) {
  const stylesDefault: React.CSSProperties = {
    textTransform: 'uppercase'
  }

  const mergedStyles = { ...style, ...stylesDefault }

  return (
    <ButtonMui
      color={color}
      className={className}
      disabled={disabled}
      fullWidth={fullWidth}
      size={size}
      variant={variant}
      onClick={onClick}
      style={mergedStyles}
      startIcon={startIcon}
      endIcon={endIcon}
      id={id}
    >
      {children}
    </ButtonMui>
  )
}
