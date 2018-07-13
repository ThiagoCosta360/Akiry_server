/*

	Algoritmo para converter documento u.item da base de
	dados MovieLens 100k do formato csv para json.

	autor: Thiago Costa
	data: 01/07/2018

*/

#include <stdlib.h>
#include <stdio.h>
#include <string.h>

//Estrutura para armazenar os objetos de cada filme.
typedef struct json{
	int id;
	char title[100];
	int day;
	char month[5];
	int year;
	char video_date[50];
	char url[50];
	int genre[20];
}JSON;

//Função que imprime o objeto no formato json no novo arquivo
void impress(FILE* output,JSON* object){
	int cont=0;
	int flag_parting=0;//Se 1, imprime a virgula antes do proximo termo.
	if(object->id>1){
		fprintf(output,",\n");
	}
	fprintf(output,"\t{\n");
		fprintf(output,"\t\t\"title\" : \"%s\"",object->title);
			fprintf(output,",\n");
		fprintf(output,"\t\t\"year\" : %d",object->year);
			fprintf(output,",\n");
		fprintf(output,"\t\t\"genre\" : ");
			fprintf(output,"[");
			while(cont<19){
				if(object->genre[cont]==1){
					if(flag_parting==1){
						fprintf(output,",");
					}
					switch (cont){
						case 0:
							fprintf(output,"\"unknown\"");
							break;
						case 1:
							fprintf(output,"\"Action\"");
							break;
						case 2:
							fprintf(output,"\"Adventure\"");
							break;
						case 3:
							fprintf(output,"\"Animation\"");
							break;
						case 4:
							fprintf(output,"\"Children\"");
							break;
						case 5:
							fprintf(output,"\"Comedy\"");
							break;
						case 6:
							fprintf(output,"\"Crime\"");
							break;
						case 7:
							fprintf(output,"\"Documentary\"");
							break;
						case 8:
							fprintf(output,"\"Drama\"");
							break;
						case 9:
							fprintf(output,"\"Fantasy\"");
							break;
						case 10:
							fprintf(output,"\"Film-Noir\"");
							break;
						case 11:
							fprintf(output,"\"Horror\"");
							break;
						case 12:
							fprintf(output,"\"Musical\"");
							break;
						case 13:
							fprintf(output,"\"Mystery\"");
							break;
						case 14:
							fprintf(output,"\"Romance\"");
							break;
						case 15:
							fprintf(output,"\"Sci-Fi\"");
							break;
						case 16:
							fprintf(output,"\"Thriller\"");
							break;
						case 17:
							fprintf(output,"\"War\"");
							break;
						case 18:
							fprintf(output,"\"Western\"");
							break;

					}
					flag_parting=1;
				}
				cont++;
			}
			flag_parting=0;
			fprintf(output,"]\n");
	fprintf(output,"\t}");
	return;
}

//Função que lê o objeto no formato csv no arquivo antigo
JSON* process(FILE* input,JSON* object){
	char character;
	int cont=0;

	fscanf(input,"%d|",&object->id);
	printf("%d - \n",object->id);

	while( (character=getc(input)) != '|'){

		object->title[cont]=character;
		cont++;
	}
	object->title[cont]='\0';
	cont=0;

	fscanf(input,"%d",&object->day);
	fscanf(input,"-%c%c%c-",&object->month[0],&object->month[1],&object->month[2]);
	fscanf(input,"%d|",&object->year);
	object->month[3]='\0';

	while( (character=getc(input)) != '|'){
		object->video_date[cont]=character;
		cont++;
	}
	object->video_date[cont]='\0';
	cont=0;

	while( (character=getc(input)) != '|'){
		object->url[cont]=character;
		cont++;
	}
	object->url[cont]='\0';
	cont=0;

	while(cont<19){
		fscanf(input,"%d|",&object->genre[cont]);
		cont++;
	}

	return object;
}

//Varre todas os objetos e imprime
int main(){
	FILE* input = fopen("u.item","r");
	FILE* output = fopen("movie.json","a");
	JSON* object = malloc(sizeof(JSON));
	object->id=1;

	if(input==NULL){
		printf("Nao foi possivel encontrar o arquivo para converter\n");
	}

	fprintf(output,"[\n");
	while(object->id<1682){

		process(input,object);
		impress(output,object);
	}
	fprintf(output,"\n]");

	fclose(input);
	fclose(output);

	printf("input convertido com sucesso!\n");
	return 0;
}
