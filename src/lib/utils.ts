import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatCurrencyFromFloatToBRL (value: number): string {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return formatter.format(value);
};

export function formatCurrencyFromIntToBRL(value: number): string {
  if(value === 0) return 'R$ 00,00'
  // Dividir por 100 para converter centavos para reais
  const realValue: number = value / 100;

  const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
  });

  return formatter.format(realValue);
}