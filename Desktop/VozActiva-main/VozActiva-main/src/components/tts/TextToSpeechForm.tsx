"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Download, Play, Mic } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { generateSpeech } from "@/app/actions";

const formSchema = z.object({
  text: z
    .string()
    .min(1, { message: "El texto no puede estar vacío." })
    .max(1000, { message: "El texto no puede exceder los 1000 caracteres." }),
  voice: z.enum(["female", "male"]).default("female"),
});

type TextToSpeechFormProps = {
  onGenerationComplete: (data: { text: string; audioSrc: string }) => void;
};

export function TextToSpeechForm({
  onGenerationComplete,
}: TextToSpeechFormProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [generatedText, setGeneratedText] = useState<string>("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      voice: "female",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsGenerating(true);
    setAudioSrc(null);

    const result = await generateSpeech(values.text, values.voice);

    setIsGenerating(false);

    if (result.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    } else if (result.audioSrc) {
      setAudioSrc(result.audioSrc);
      setGeneratedText(values.text);
      onGenerationComplete({ text: values.text, audioSrc: result.audioSrc });
      toast({
        title: "Éxito",
        description: "Audio generado correctamente.",
      });
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="text-primary" />
          Convertir Texto a Voz
        </CardTitle>
        <CardDescription>
          Introduce tu texto para convertirlo en audio. El idioma se detectará
          automáticamente.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Texto</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Escribe algo aquí..."
                      className="min-h-[150px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="voice"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Tipo de voz</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="female" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Femenina</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="male" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Masculina</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button
              type="submit"
              disabled={isGenerating}
              className="w-full sm:w-auto"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Generar Audio
                </>
              )}
            </Button>

            {audioSrc && (
              <div className="w-full space-y-4 rounded-lg border bg-secondary/50 p-4 animate-in fade-in-50">
                <p className="text-sm font-medium">Resultado:</p>
                <audio controls src={audioSrc} className="w-full">
                  Tu navegador no soporta el elemento de audio.
                </audio>
                <Button asChild variant="outline" size="sm">
                  <a href={audioSrc} download={`${generatedText.substring(0, 20).replace(/\s/g, '_')}.wav`}>
                    <Download className="mr-2 h-4 w-4" />
                    Descargar Audio
                  </a>
                </Button>
              </div>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
