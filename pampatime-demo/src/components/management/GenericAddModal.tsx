import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ManagedItem, EntityFormConfig, FormField } from '@/types/management';
import useFirestoreOperations from '@/hooks/useFirestoreOperations';

interface GenericAddModalProps<T extends ManagedItem> {
  isOpen: boolean; 
  onClose: () => void; 
  collectionPath: string; 
  formConfig: EntityFormConfig<T>; 
  onItemAdded: () => void; 
}

const GenericAddModal = <T extends ManagedItem>({
  isOpen,
  onClose,
  collectionPath,
  formConfig,
  onItemAdded,
}: GenericAddModalProps<T>) => {
  const [formData, setFormData] = useState<Omit<T, 'id'>>(() => formConfig.defaultValues);

  const { addDocument, loading, error, success } = useFirestoreOperations<T>(collectionPath);

  useEffect(() => {
    setFormData(formConfig.defaultValues);
  }, [isOpen, formConfig]); 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    const fieldType = formConfig.fields.find(field => field.id === id)?.type;
    const typedValue = fieldType === 'number' ? Number(value) : value;

    setFormData(prev => ({ ...prev, [id]: typedValue } as Omit<T, 'id'>)); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    for (const field of formConfig.fields) {
      if (field.required && (!formData[field.id as keyof Omit<T, 'id'>] || String(formData[field.id as keyof Omit<T, 'id'>]).trim() === '')) {
        alert(`Por favor, preencha o campo ${field.label}.`);
        return;
      }
    }

    const newDocId = await addDocument(formData);

    if (newDocId) {
      alert(`${formConfig.title.replace('Adicionar ', '')} adicionado(a) com sucesso!`);
      onItemAdded(); 
      onClose(); 
    } else if (error) {
      alert(`Erro ao adicionar ${formConfig.title.replace('Adicionar ', '').toLowerCase()}: ${error}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]"> 
        <DialogHeader>
          <DialogTitle>{formConfig.title}</DialogTitle>
          <DialogDescription>
            Preencha os dados do(a) novo(a) {formConfig.title.replace('Adicionar ', '').toLowerCase()}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {formConfig.fields.map((field: FormField) => (
            <div className="grid grid-cols-4 items-center gap-4" key={field.id}>
              <Label htmlFor={field.id} className="text-right">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {field.type === 'select' ? (
                <select
                  id={field.id}
                  value={String((formData as any)[field.id] || '')} 
                  onChange={handleChange as any} 
                  className="col-span-3 p-2 border rounded-md"
                  required={field.required}
                >
                  <option value="">Selecione...</option>
                  {field.options?.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              ) : (
                <Input
                  id={field.id}
                  type={field.type === 'number' ? 'number' : field.type === 'email' ? 'email' : 'text'}
                  value={String((formData as any)[field.id] || '')} 
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="col-span-3"
                  required={field.required}
                />
              )}
            </div>
          ))}

          <DialogFooter className="flex justify-end gap-4 mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-green-500 hover:bg-green-600" disabled={loading}>
              {loading ? 'Adicionando...' : formConfig.title}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GenericAddModal;