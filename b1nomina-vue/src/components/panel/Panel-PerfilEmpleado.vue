<template>
    <div class="panel-PerfilEmpleado">

        <LayoutCabeceraEmpleado :imagen="DatosUsuario?.foto">
            <template #Rol>
                Rol                
            </template>
            <template #Nombre>
                {{ DatosUsuario?.nombres }} {{ DatosUsuario?.apellido_paterno }}
            </template>
            <template #Cargo>
                {{ DatosUsuario?.cargo }}           
            </template>
            <template #Botones>

                <TemplateButton2 text="Ver último combrobante de pago"  @click="() => console.log('Descargar comprobante')" >
                    <template #post>                                        
                        <OjitoIcon Stroke="#002E99"/>
                    </template>
                </TemplateButton2>

                <TemplateButton2 text="Liquidar" @click="() => console.log('Liquidar Empleado')">
                    <template #post>                                        
                        <DolarIcon color="#002E99" />
                    </template>
                </TemplateButton2>

                <TemplateButton2 :text="(DatosUsuario?.activo == 1)? 'Desactivar' : 'Activar'" @click="() => console.log((DatosUsuario?.activo == 1)? 'Desactivar' : 'Activar')">
                    <template #post>                                        
                        <ExitColorIcon Stroke="#002E99" />
                    </template>
                </TemplateButton2>


            </template>
        </LayoutCabeceraEmpleado>     
        <!--Descripciones Generales-->  
        <div class="cards">
            <boxInfo color="rgba(0, 112, 255, 0.20)">
                <template #Titulo>
                    <DolarIcon color="black" />
                    Salario mensual
                </template>
                <template #Texto>
                    <span>{{DatosUsuario?.unidad_sueldo_caracter}} {{DatosUsuario?.salario_base >> 0}}</span>
                </template>
            </boxInfo>

            <boxInfo color=" rgba(96.90, 255, 0, 0.20)">
                <template #Titulo>
                    <InfoIcon />
                    Conceptos recurrentes
                </template>
                <template #General>
                    descripcion
                </template>
            </boxInfo>

            <boxInfo color="rgba(255, 137.70, 0, 0.20)">
                <template #Titulo>
                    <SolIcon color="black" />Vacaciones acumuladas
                </template>
                <template #Texto>
                    {{DatosUsuario?.vacaciones_acumuladas}} días
                </template>
            </boxInfo>
        </div>
        <!--Tabla para mostrar información-->
        <LayoutForm>
                <template v-slot:cabecera>
                    <NavButtonTemplate text="Datos Laborales" :seleccionado="panelShow== 1" @click="showInfo(1)" />
                    <NavButtonTemplate text="Datos Personales" :seleccionado="panelShow== 2" @click="showInfo(2)" />
                    <NavButtonTemplate text="Datos de Pago" :seleccionado="panelShow== 3" @click="showInfo(3)" />
                    <NavButtonTemplate text="Datos Previsionales" :seleccionado="panelShow== 4" @click="showInfo(4)" />
                    <NavButtonTemplate text="Prestamos" :seleccionado="panelShow== 5" @click="showInfo(5)" />
                    <NavButtonTemplate text="Documentos" :seleccionado="panelShow== 6" @click="showInfo(6)"/>
                </template>
                <template v-slot:formulario>
                    <div class="contenedorInfo" v-if="panelShow == 1">            
                        <LayoutTablaEMpleados>
                            <!--Formulario Salario-->
                            <template #boton1>                                                                    
                                <TemplateBlanckButton @click="EditarInfo?.ActionButton(1, EmpleadoID)" text="Editar">
                                    <template #default>
                                        <EdiIcon Stroke="#000000"/>
                                    </template>
                                </TemplateBlanckButton>
                            </template>
                            <!--Formulario Datos Contrato-->
                            <template #boton2>                                                                    
                                <TemplateBlanckButton @click="EditarInfo?.ActionButton(2,EmpleadoID)" text="Editar">
                                    <template #default>
                                        <EdiIcon Stroke="#000000"/>
                                    </template>
                                </TemplateBlanckButton>
                            </template>
                            <!--Formulario Puesto Trabajo-->
                            <template #boton4>                                                                    
                                <TemplateBlanckButton @click="EditarInfo?.ActionButton(3,EmpleadoID)" text="Editar">
                                    <template #default>
                                        <EdiIcon Stroke="#000000"/>
                                    </template>
                                </TemplateBlanckButton>
                            </template>
                            <!--Formulario-->
                            <template #boton6>                                                                    
                                <TemplateBlanckButton @click="EditarInfo?.ActionButton(4,EmpleadoID)" text="Editar">
                                    <template #default>
                                        <EdiIcon Stroke="#000000"/>
                                    </template>
                                </TemplateBlanckButton>
                            </template>

                            <!--primer apartado-->
                            <template #titulo1>                                                                    
                                Salario
                            </template>                            
                            <template #st-1> <!--Cantidad-->                                                                    
                                Periodo
                            </template>
                            <template #text-1>                                                                    
                                {{DatosUsuario?.periodo_sueldo_caracter}}
                            </template>
                            <template #st-2>  <!--Salario base-->                                                                 
                                Unidad Sueldo Base
                            </template>
                            <template #text-2>                                                                    
                                {{DatosUsuario?.unidad_sueldo_caracter}} 
                            </template>
                            <template #st-3>  <!--Salario base-->                                                                 
                                Salario base
                            </template>
                            <template #text-3>                                                                    
                                {{DatosUsuario?.salario_base << 0}}                    
                            </template>
                            
                            <!--segundo apartado-->

                            <template #titulo2>                                                                    
                                Datos de contrato
                            </template>                            
                            <template #st-5> <!--Tipo de contrato-->                                                         
                                Tipo de contrato
                            </template>
                            <template #text-5>                                                                    
                                {{DatosUsuario?.tipo_contrato}}
                            </template>
                            <template #st-6> <!--Término de contrato-->                                                                 
                                Término de contrato
                            </template>
                            <template #text-6>                                                                    
                                {{DatosUsuario?.termino_contrato_nombre}}
                            </template>
                            <template #st-7>  <!--Fecha de contratación-->                                                                            
                                Fecha de contratación
                            </template>
                            <template #text-7>                                                                    
                                {{DatosUsuario?.fecha_inicio}}
                            </template>
                            <template #st-8> <!--Fecha terminación del contrato-->                                                                     
                                Fecha terminación del contrato
                            </template>
                            <template #text-8>                                                                    
                                {{DatosUsuario?.fecha_fin}}
                            </template>
                            <template #st-9> <!--Nivel de estudio-->                                                                      
                                Nivel de estudio
                            </template>
                            <template #text-9>                                                                    
                                {{DatosUsuario?.nivel_estudio}}
                            </template>
                            <template #st-10> <!--Días de descanso-->    
                                Días de descanso
                            </template>
                            <template #text-10>                                                                    
                                {{DatosUsuario?.dias_descanso?.split(',').map(dia => almacen?.diasLaborales[dia])?.join(', ')}}
                            </template>

                             <!--segundo apartado-->

                            <template #titulo4>                                                                    
                                Puesto de trabajo
                            </template>                                                        
                            <template #st-13>  <!--Sede de Trabajo-->                                                                            
                                Sede de Trabajo
                            </template>
                            <template #text-13>                                                                    
                                {{DatosUsuario?.nombre_sede}}
                            </template>
                            <template #st-14> <!--Departamento-->                                                                     
                                Departamento
                            </template>
                            <template #text-14>                                                                    
                                {{DatosUsuario?.nomdepartamento}}
                            </template>
                            <template #st-15> <!--Cargo-->                                                                      
                                Cargo
                            </template>
                            <template #text-15>                                                                    
                                {{DatosUsuario?.cargo}}
                            </template>
                            <template #st-16> <!--GRUPO-->    
                                Grupo
                            </template>
                            <template #text-16>                                                                    
                                {{DatosUsuario?.nombre_grupo}}
                            </template>                            
                            <template #st-17> <!--Modalidad-->    
                                Modalidad
                            </template>
                            <template #text-17>                                                                    
                                <InterruptorButton
                                    Tipo="individual"
                                    Texto="Teletrabajo" 
                                    :Estado="(DatosUsuario?.modalidad == 0)?false :true"
                                />
                            </template>

                            <template #titulo6>                                                                    
                                Centralización y Datos Adicionales
                            </template>                                                        
                            <template #st-21>  <!-- Grupo Centralización-->
                                Grupo de Centralización
                            </template>
                            <template #text-21>                                                                    
                                {{DatosUsuario?.Centralizacion}}
                            </template>                     
                            <template #st-22>  <!-- Campo adicional-->
                                Campo 1
                            </template>
                            <template #text-22>                                                                    
                                {{DatosUsuario?.campo1}}
                            </template>                     
                            <template #st-23>  <!-- Campo adicional-->
                                Campo 2
                            </template>
                            <template #text-23>                                                                    
                                {{DatosUsuario?.campo2}}
                            </template>                     
                            <template #st-24>  <!-- Campo adicional-->
                                Campo 3
                            </template>
                            <template #text-24>                                                                    
                                {{DatosUsuario?.campo3}}
                            </template>                     
                            <template #st-25>  <!-- Campo adicional-->
                                Campo 4
                            </template>
                            <template #text-25>                                                                    
                                {{DatosUsuario?.campo4}}
                            </template>                     
                            <template #st-26>  <!-- Campo adicional-->
                                Campo 5
                            </template>
                            <template #text-26>                                                                    
                                {{DatosUsuario?.campo5}}
                            </template>  

                        </LayoutTablaEMpleados>
                    </div>

                    <div class="contenedorInfo" v-if="panelShow == 2">
                        <LayoutTablaEMpleados>
                            <template #boton1>                                                                    
                                <TemplateBlanckButton @click="EditarInfo?.ActionButton(5,EmpleadoID)" text="Editar">
                                    <template #default>
                                        <EdiIcon Stroke="#000000"/>
                                    </template>
                                </TemplateBlanckButton>
                            </template>
                            <template #boton3>                                                                    
                                <TemplateBlanckButton @click="EditarInfo?.ActionButton(6,EmpleadoID)" text="Editar">
                                    <template #default>
                                        <EdiIcon Stroke="#000000"/>
                                    </template>
                                </TemplateBlanckButton>
                            </template>                            

                        <!--primer apartado-->
                            <template #titulo1>                                                                    
                                Datos principales
                            </template>                            
                            <template #st-1>                                                                    
                                Nombres
                            </template>
                            <template #text-1>                                                                    
                                {{DatosUsuario?.nombres}}
                            </template>
                            <template #st-2>                                                                    
                                Apellidos
                            </template>
                            <template #text-2>                                                                    
                                {{DatosUsuario?.apellido_paterno}} {{DatosUsuario?.apellido_materno}}
                            </template>
                            <template #st-3>                                                                    
                                N° de Rut
                            </template>
                            <template #text-3>                                                                    
                                {{DatosUsuario?.rut}}
                            </template>
                            <template #st-4>                                                                    
                                Fecha de Nacimiento
                            </template>
                            <template #text-4>                                                                    
                                {{DatosUsuario?.fecha_nacimiento}}
                            </template>                                                    
                            <template #st-5>                                                                    
                                Nacionalidad
                            </template>
                            <template #text-5>                                                                    
                                {{DatosUsuario?.Nacionalidad}}
                            </template>
                            <template #st-6>                                                                    
                               Estado Civil
                            </template>
                            <template #text-6>                                                                    
                                {{DatosUsuario?.descripcion_estado_civil}}
                            </template>
                            <template #st-7>                                                                    
                                Sexo
                            </template>
                            <template #text-7>                                                                    
                                {{(DatosUsuario?.sexo == 0)? "Femenino" : "Masculino"}}
                            </template>
                            
                        <!--segundo apartado-->

                            <template #titulo3>                                                                    
                                Datos de contacto
                            </template>                            
                            <template #st-9> <!--Correo Electrónico-->                                                         
                                Correo Electrónico
                            </template>
                            <template #text-9>                                                                    
                                {{DatosUsuario?.email}}
                            </template>
                            <template #st-10> <!--Telefono Celular-->                                                                 
                                Telefono Celular
                            </template>
                            <template #text-10>                                                                    
                                {{DatosUsuario?.movil}}
                            </template>
                            <template #st-11>  <!--Telefono Local-->                                                                            
                                Telefono Local
                            </template>
                            <template #text-11>                                                                    
                                {{DatosUsuario?.fijo}}
                            </template>
                            <template #st-12> <!--Región-->                                                                     
                                Región
                            </template>
                            <template #text-12>                                                                    
                                {{DatosUsuario?.nomregion}}
                            </template>
                            <template #st-13> <!--Localidad-->                                                                      
                                Localidad
                            </template>
                            <template #text-13>                                                                    
                                {{DatosUsuario?.nomcomuna}}
                            </template>
                            <template #st-14> <!--Dirección-->    
                               Dirección
                            </template>
                            <template #text-14>                                                                    
                                {{DatosUsuario?.direccion}}
                            </template>
                
                        </LayoutTablaEMpleados>
                    </div>

                    <div class="contenedorInfo tablas" v-if="panelShow == 3">  <!--Datos de Pago-->
                        <LayoutTablaEMpleados>
                            <template #boton2>                                                                    
                                <TemplateBlanckButton @click="EditarInfo?.ActionButton(7,EmpleadoID)" text="Editar">
                                    <template #default>
                                        <EdiIcon Stroke="#000000"/>
                                    </template>
                                </TemplateBlanckButton>
                            </template>
                        <!--primer apartado-->
                            <template #titulo1>                                                                    
                                Datos de pago
                            </template>       

                            <template #st-1></template>

                            <template #text-1>                                                                    
                                <InputRadioButton 
                                    texto="Transferencia Bancaria"
                                />                                
                            </template>

                            <template #st-2></template>

                            <template #text-2>                                                                    
                                <InputRadioButton 
                                    texto="Cheque"
                                />                                
                            </template>

                            <template #st-3></template>

                            <template #text-3>                                                                    
                                <InputRadioButton 
                                    texto="Al contado"
                                />
                            </template>
                            <template #st-4></template>

                            <template #text-4></template>   

                            <template #titulo2>                                                                    
                                Cuenta Activa
                            </template>  

                            <template #st-5>                                                                    
                                Banco
                            </template>
                            <template #text-5>                                                                    
                                {{DatosUsuario?.nombre_banco}}
                            </template>
                            <template #st-6>                                                                    
                                Tipo de cuenta
                            </template>
                            <template #text-6>                                                                                                                                    
                                {{DatosUsuario?.tipo_cuenta_nombre}}
                            </template>
                            <template #st-7>                                                                    
                                Número de cuenta
                            </template>
                            <template #text-7>                                                                                                                                    
                                {{DatosUsuario?.numero_cuenta}}
                            </template>
                            <template #st-8>                                                                    
                                Cuenta de tercero
                            </template>
                            <template #text-8>      
                                <InterruptorButton
                                    Tipo="individual"
                                    :Texto="(DatosUsuario?.terceros == 1)? 'Activo' : 'Inactivo' " 
                                    :Estado="(DatosUsuario?.terceros == 1)? true : false"
                                />                                                                                                                              
                            </template>
                            
                            <template #st-9>                                                                    
                                Rut Tercero
                            </template>
                            <template #text-9>                                                                                                                                    
                                {{DatosUsuario?.rut_tercero}}
                            </template>
                            <template #st-10>                                                                    
                                Nombre y apellido Tercero
                            </template>
                            <template #text-10>                                                                                                                                    
                                {{DatosUsuario?.nombre_tercero}}
                            </template>
                            <template #st-11>                                                                    
                                Correo Tercero
                            </template>
                            <template #text-11>                                                                                                                                    
                                {{DatosUsuario?.email_tercero}}
                            </template>
                        </LayoutTablaEMpleados>

                        <LayoutTablasSimples Titulo="Historial cuentas bancarias">
                            <template #boton>
                            
                                <TemplateButton2 @click="EditarInfo?.ActionButton(12,EmpleadoID)" text="Añadir Cuenta" >
                                    <template #default>                                        
                                        <PlusCirculoIcon Stroke="#002E99"/>
                                    </template>
                                </TemplateButton2> 
                                
                            </template>
                
                            <template #Tabla>
                                <ListaCuentas />
                            </template>
                        </LayoutTablasSimples>
                    </div>

                    <div class="contenedorInfo tablas" v-if="panelShow == 4">  <!--Datos Previsionales-->
                        <LayoutTablaEMpleados>
                            <template #boton1>                                                                    
                                <TemplateBlanckButton @click="EditarInfo?.ActionButton(8,EmpleadoID)" text="Editar">
                                    <template #default>
                                        <EdiIcon Stroke="#000000"/>
                                    </template>
                                </TemplateBlanckButton>
                            </template>
                            <template #boton3>                                                                    
                                <TemplateBlanckButton @click="EditarInfo?.ActionButton(9,EmpleadoID)" text="Editar">
                                    <template #default>
                                        <EdiIcon Stroke="#000000"/>
                                    </template>
                                </TemplateBlanckButton>
                            </template>
                            <template #boton5>                                                                    
                                <TemplateBlanckButton @click="EditarInfo?.ActionButton(10,EmpleadoID)" text="Editar">
                                    <template #default>
                                        <EdiIcon Stroke="#000000"/>
                                    </template>
                                </TemplateBlanckButton>
                            </template>
                            <template #boton6>                                                                    
                                <TemplateBlanckButton @click="EditarInfo?.ActionButton(11,EmpleadoID)" text="Editar">
                                    <template #default>
                                        <EdiIcon Stroke="#000000"/>
                                    </template>
                                </TemplateBlanckButton>
                            </template>

                        <!--primer apartado-->
                            <template #titulo1>                                                                    
                                Administradoras de fondos de pensiones (AFP)
                            </template>

                            <template #st-1>                                                                    
                                Jubilado AFP
                            </template>
                            <template #text-1>                                                                    
                                <InterruptorButton
                                    Tipo="individual"
                                    :Texto="(DatosUsuario?.jubilado_afp == 1)? 'Activo' : 'Inactivo' " 
                                    :Estado="(DatosUsuario?.jubilado_afp == 1)? true : false"
                                />
                            </template>
                            <template #st-2>                                                                    
                                Institución
                            </template>
                            <template #text-2>                                                                    
                                {{ DatosUsuario?.afp_nombre }}
                            </template>
                            <template #st-3>                                                                    
                                Ahorro AFP Cuenta 2 ($)
                            </template>
                            <template #text-3>                                                                    
                               $ {{ DatosUsuario?.ahorro_afp2 }}
                            </template>

                            
                        <!--segundo apartado-->

                            <template #titulo3>                                                                    
                                Ahorro Provisional Voluntario (APV)
                            </template>
                                                       
                            <template #st-9>                                                       
                                Activo
                            </template>
                            <template #text-9>                                                                    
                                <InterruptorButton
                                    Tipo="individual"
                                    :Texto="(DatosUsuario?.apv_activo == 1)? 'Activo' : 'Inactivo' " 
                                    :Estado="(DatosUsuario?.apv_activo == 1)? true : false"
                                />
                            </template>
                            <template #st-10> <!---->                                                                 
                                Colectivo
                            </template>
                            <template #text-10>                                                                    
                                <InterruptorButton
                                    Tipo="individual"
                                    :Texto="(DatosUsuario?.colectivo == 1)? 'Activo' : 'Inactivo' " 
                                    :Estado="(DatosUsuario?.colectivo == 1)? true : false"
                                />
                            </template>
                            <template #st-11>  <!---->                                                                            
                                Directo
                            </template>
                            <template #text-11>                                                                    
                                <InterruptorButton
                                    Tipo="individual"
                                    :Texto="(DatosUsuario?.pago_directo == 1)? 'Activo' : 'Inactivo' " 
                                    :Estado="(DatosUsuario?.pago_directo == 1)? true : false"
                                />
                            </template>
                            <template #st-12> <!--Institución APV-->                                                                     
                                Institución
                            </template>
                            <template #text-12>                                                                    
                                {{ DatosUsuario?.apv_institucion_nombre }}
                            </template>
                            <template #st-13> <!--Unidad APV-->                                                                      
                                Unidad
                            </template>
                            <template #text-13>                                                                    
                                {{ (DatosUsuario?.unidad_pacto_id == 1)? '$': 'UF' }}
                            </template>
                            <template #st-14> <!--Régimen APV-->    
                               Régimen
                            </template>
                            <template #text-14>                                                                    
                                {{ (DatosUsuario?.regimen == 1)? 'A' : 'B' }}
                            </template>

                            <template #st-15> <!--Pactado APV-->    
                               Pactado($)
                            </template>
                            <template #text-15>                                                                    
                                {{ DatosUsuario?.monto_pacto }}
                            </template>

                            <template #st-16> <!-- N° Convenio APV-->    
                               N° Convenio
                            </template>
                            <template #text-16>                                                                    
                                {{ DatosUsuario?.nconvenio }}
                            </template>

                        <!--segundo apartado-->

                            <template #titulo5>                                                                    
                               Previsión de Salud
                            </template>     
                                                                               
                            <template #st-17>  <!---->                                                                            
                                Institución
                            </template>
                            <template #text-17>                                                                    
                                {{ DatosUsuario?.nombre_prevision_salud }}
                            </template>
                            <!--
                            <template #st-18>                                                                      
                                Banco
                            </template>
                            <template #text-18>                                                                    
                                {{DatosUsuario?.nombre_banco}}
                            </template>

                            -->
                            <template #st-19> <!---->                                                                      
                                Pactado (UF)
                            </template>
                            <template #text-19>                                                                    
                                {{ DatosUsuario?.pactado }}
                            </template>
                            <!--
                            <template #st-20> 
                                Número de cuenta
                            </template>
                            <template #text-20>                                                                    
                                {{DatosUsuario?.numero_cuenta}}
                            </template>
                            -->

                            <template #titulo6>                                                                    
                               Datos Adicionales
                            </template>  

                            <template #st-21> <!---->                                                                      
                                Aplica Gratificación Legal
                            </template>
                            <template #text-21>                                                                    
                                <InterruptorButton
                                    Tipo="individual"
                                    :Texto="(DatosUsuario?.gratificacion == 1)? 'Activo' : 'Inactivo' " 
                                    :Estado="(DatosUsuario?.gratificacion == 1)? true : false"
                                />
                            </template>
                            <template #st-22> <!---->                                                                      
                                Afiliado AFC
                            </template>
                            <template #text-22>                                                                    
                                <InterruptorButton
                                    Tipo="individual"
                                    :Texto="(DatosUsuario?.afiliado_afc == 1)? 'Activo' : 'Inactivo' " 
                                    :Estado="(DatosUsuario?.afiliado_afc == 1)? true : false"
                                />
                            </template>
                            <template #st-23> <!---->                                                                      
                                Antiguedad Máxima AFC
                            </template>
                            <template #text-23>                                                                    
                                <InterruptorButton
                                    Tipo="individual"
                                    :Texto="(DatosUsuario?.antiguedad_afc == 1)? 'Activo' : 'Inactivo' " 
                                    :Estado="(DatosUsuario?.antiguedad_afc == 1)? true : false"
                                />
                            </template>
                            <!--
                            <template #st-24>                                                                
                                
                            </template>
                            <template #text-24>                                                                    
   
                            </template>
                            -->
                            <template #st-25> <!--Tipo de cuenta-->                                                                      
                               Pens. Vejez
                            </template>
                            <template #text-25>                                                                    
                                <InterruptorButton
                                    Tipo="individual"
                                    :Texto="(DatosUsuario?.vejez == 1)? 'Activo' : 'Inactivo' " 
                                    :Estado="(DatosUsuario?.vejez == 1)? true : false"
                                />
                            </template>
                            <template #st-26> <!--Tipo de cuenta-->                                                                      
                                 Pens. Invalidez
                            </template>
                            <template #text-26>                                                                    
                                <InterruptorButton
                                    Tipo="individual"
                                    :Texto="(DatosUsuario?.invalidez == 1)? 'Activo' : 'Inactivo' " 
                                    :Estado="(DatosUsuario?.invalidez == 1)? true : false"
                                />
                            </template>
                            <template #st-27> <!--Tipo de cuenta-->                                                                      
                                Es ExINP
                            </template>
                            <template #text-27>                                                                    
                                <InterruptorButton
                                    Tipo="individual"
                                    :Texto="(DatosUsuario?.exinp == 1)? 'Activo' : 'Inactivo' " 
                                    :Estado="(DatosUsuario?.exinp == 1)? true : false"
                                />
                            </template>
                            
                        </LayoutTablaEMpleados>            

                        <LayoutTablasSimples Titulo="Asignacion de Cargas Previsionales">
                            <template #boton>
                            
                                <TemplateButton2 @click="EditarInfo?.ActionButton(14,EmpleadoID)" text="Nueva Carga Previsional" >
                                    <template #default>                                        
                                        <PlusCirculoIcon Stroke="#002E99"/>
                                    </template>
                                </TemplateButton2> 
                                
                            </template>
                
                            <template #Tabla>
                                <AsignacionesCargaPrevisionales
                                    :listadoCargas="ListadoCargaPrevisionales"
                                    @editarDatosFamiliar="(datos) => EditarInfo?.ActionButton(15,EmpleadoID, datos)"
                                />
                            </template>
                        </LayoutTablasSimples>
                    </div>

                    <div class="contenedorInfo tablas" v-if="panelShow == 5">  <!--Prestamos-->

                        <LayoutTablasSimples Titulo="Asignación de Préstamos">
                            <template #boton>
                            
                                <TemplateButton2 @click="EditarInfo?.ActionButton(13,EmpleadoID)" text="Nuevo Préstamo" >
                                    <template #default>                                        
                                        <PlusCirculoIcon Stroke="#002E99"/>
                                    </template>
                                </TemplateButton2> 
                                
                            </template>
                
                            <template #Tabla>
                                <AsignacionesPrestamos 
                                    :Listado="ListadoPrestamos" 
                                    @verCuotas="(datos) => EditarInfo?.ActionButton(19, EmpleadoID, datos)"    
                                    @eliminarPrestamo="(datos) => EditarInfo?.ActionButton(18, EmpleadoID, datos)"    
                                />
                            </template>
                        </LayoutTablasSimples>
                    </div>                    

                    <div class="contenedorInfo tablas" v-if="panelShow == 6"> <!--Documentos-->
                        <LayoutTablasSimples Titulo="Contratos">
                            <template #boton>
                            
                                <TemplateButton2 @click="EditarInfo?.ActionButton(16, EmpleadoID)" text="Nuevo Contrato" >
                                    <template #default>                                        
                                        <PlusCirculoIcon Stroke="#002E99"/>
                                    </template>
                                </TemplateButton2> 
                                
                            </template>
                
                            <template #Tabla>
                                
                                    <ListaContrato 
                                        :listadoContratos="ListadoContrato"
                                    />
                                
                            </template>
                        </LayoutTablasSimples> 

                        <LayoutTablasSimples Titulo="Archivos Adicionales">
                            <template #boton>                            
                                <TemplateButton2 @click="EditarInfo?.ActionButton(17, EmpleadoID)" text="Nuevo Archivo" >
                                    <template #default>                                        
                                        <PlusCirculoIcon Stroke="#002E99"/>
                                    </template>
                                </TemplateButton2>                                 
                            </template>
                                
                            <template #Tabla>
                                <ListadoArchivos 
                                    :listadoArchivos=ListadoArchivosAdicionales
                                />
                            </template>
                        </LayoutTablasSimples>                        
                    </div>
                </template>
        </LayoutForm>
        <!--Modales Editar información-->
        <CicloEditarEmpleado ref="EditarInfo" @actualizarTablas="ActualizarDataTablas"/>

        <AlertShort
            ref="notificacionStatus"
        />

        <ShortTemplateModal
            NombreAccion="Foto de Perfil"
            textSubmit="Cambiar"
            FormId="a"
            ref="shortTemplateModal"
            :DataNotification="{}"
        >
            <template #default>
            
                <p>ACA VA EL FORMULARIO</p>        
                
            </template>
            <template #boton>
                <div>
                    BOTON
                </div>
            </template>
        </ShortTemplateModal>
    </div>
</template>

<script setup>
    // Importación de componentes específicos utilizados en la página
    import LayoutCabeceraEmpleado from '@/components/Layouts/LayoutCabeceraEmpleado.vue';
    import LayoutForm from '@/components/Layouts/LayoutForm.vue';
    import LayoutTablaEMpleados from '@/components/Layouts/LayoutTabla-datosEmpleado.vue';
    import boxInfo from '@/components/elementos/Box-info.vue';
    import NavButtonTemplate from '@/components/botones/Nav-button-templateForm.vue';
    import TemplateButton2 from '@/components/botones/Template-button2.vue';
    import InterruptorButton from '@/components/inputs/Interruptor-button.vue';
    import TemplateBlanckButton from '@/components/botones/Template-blank-button.vue';
    import CicloEditarEmpleado from '@/components/elementos/Ciclo-Editar-Empleado.vue';
    import ShortTemplateModal from '@/components/modal/Short-TemplateModal.vue';
    import InputRadioButton from '@/components/botones/Input-Radio-button.vue';
    import AlertShort from '@/components/alertas/Alert-short-template.vue';

    // Importación de componentes para tablas
    import LayoutTablasSimples from '@/components/Layouts/LayoutTablasSimples.vue';
    import ListaCuentas from '@/components/tablas/perfilEmpleado/datospago/ListaCuentas-general.vue';
    import AsignacionesPrestamos from '@/components/tablas/perfilEmpleado/asignaciones/AsignacionesPrestamos-general.vue';
    import AsignacionesCargaPrevisionales from '@/components/tablas/perfilEmpleado/asignaciones/AsignacionesCargasPrevisionales-general.vue';
    import ListaContrato from '@/components/tablas/perfilEmpleado/documentos/ListaContratos-general.vue';
    import ListadoArchivos from '@/components/tablas/perfilEmpleado/documentos/ListaArchivosAdicionales-general.vue';

    // Importación de iconos para la interfaz de usuario
    import DolarIcon from '@/components/icons/Dolar-icon-blanco.vue';
    import InfoIcon from '@/components/icons/Info-icon.vue';
    import SolIcon from '@/components/icons/Sol-icon.vue';
    import OjitoIcon from '@/components/icons/Ojito-icon.vue';
    import ExitColorIcon from '@/components/icons/Exit-color-icon.vue';
    import EdiIcon from '@/components/icons/Edit-icon.vue';
    import PlusCirculoIcon from '@/components/icons/Plus-Circulo-icon.vue';

    // Importación de librerías y funciones de Vue
    import { ref, inject, onMounted, provide } from 'vue';
    import { useRoute } from 'vue-router';
    import almacen from '@/store/almacen';

    // Importación de funciones para realizar peticiones HTTP
    import peticiones_panel_empleado from '@/peticiones/p_empleado';

    // Inyección de datos del empleado desde el contexto global o componente padre
    const DatosUsuario = ref(inject('dataEmpleado'));

    // Uso de vue-router para obtener parámetros de la ruta actual
    const route = useRoute();
    const EmpleadoID = route.params.empleadoId;

    // Estado para controlar la visibilidad de paneles informativos
    const panelShow = ref(1);

    // Función para mostrar información en un panel específico
    const showInfo = (id_seccion) => {
        panelShow.value = id_seccion;
    };

    // Referencia para acceder al método mostrar de notificaciones
    const notificacionStatus = ref(null);

    // Función para activar notificaciones
    const showNotificacion = (datos) => {
        notificacionStatus.value?.ActivarNotificacion(datos); // Formato: {'Titulo': "empleado especial", 'Descripcion': "esta es la descripcion de la carta"}
    };

    // Proporcionar la función mostrarNotificacion para su uso en componentes hijos
    provide('mostrarNotificacion', showNotificacion);

    // Referencias para almacenar listados de información
    const EditarInfo = ref(null);
    const shortTemplateModal = ref(null);
    const ListadoPrestamos = ref({});
    const ListadoCargaPrevisionales = ref({});
    const ListadoContrato = ref({});
    const ListadoArchivosAdicionales = ref({});

    // Funciones para solicitar listados de información mediante peticiones HTTP
    const SolicitarListadoCargaPresionales = async (id = Number) => {
        const respuesta = await peticiones_panel_empleado?.getListadoCargaPresionales(id);
        console.log(respuesta);
        if (respuesta.success) {
            ListadoCargaPrevisionales.value = respuesta.data.data;
        } else {
            console.error(respuesta.error);
        }
    };
    const SolicitarListadoDePrestamos = async (id = Number) => {
        const respuesta = await peticiones_panel_empleado?.getListadoPrestamos(id);
        console.log(respuesta);
        if (respuesta.success) {
            ListadoPrestamos.value = respuesta.data.data;
        } else {
            console.error(respuesta.error);
        }
    };
    const SolicitarListadoDeContrato = async (id = Number) => {
        const respuesta = await peticiones_panel_empleado?.getListadoDeContrato(id);
        if (respuesta.success) {
            ListadoContrato.value = respuesta.data.resultado;
        } else {
            console.error(respuesta.error);
        }
    };
    const SolicitarListadoDeArchivos = async (id = Number) => {
        const respuesta = await peticiones_panel_empleado?.getListadoDeArchivos(id);
        if (respuesta.success) {
            ListadoArchivosAdicionales.value = respuesta.data.data;
        } else {
            console.error(respuesta.error);
        }
    };

    // Función para actualizar todos los listados de información
    const ActualizarDataTablas = async () => {
        await SolicitarListadoDePrestamos(DatosUsuario.value?.user_id);
        await SolicitarListadoCargaPresionales(DatosUsuario.value?.user_id);
        await SolicitarListadoDeContrato(DatosUsuario.value?.user_id);
        await SolicitarListadoDeArchivos(DatosUsuario.value?.user_id);
    };

    // Ejecución de la actualización de listados cuando el componente se monta
    onMounted(async () => {
        await ActualizarDataTablas();
    });
</script>


<style scoped>
/* 
 Contenedor principal del formulario de empleados, configurado para ocupar todo el espacio disponible
 y organizar sus elementos en una columna. El uso de 'display: flex' y 'flex-direction: column' permite
 una disposición flexible y ordenada de los elementos del formulario.
*/
div.panel-PerfilEmpleado {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap:24px; /* Espaciado entre los elementos del formulario para mejorar la legibilidad */
}

div.cards {
    display: flex;
    flex-direction: row;
    gap: 24px;
    justify-content: space-around;
    
}

div.contenedorInfo {
    background: #fcfcfc;
}
div.contenedorInfo.tablas {
    display: flex;
    flex-direction: column;
    background: #fcfcfc;
    gap: 2.5rem;
    margin: 12px 0 ; 
}

h3.titulo {
    font-size: 24px;
    font-weight: 500;
    line-height: 34px;
    text-align: left;
    color: #1A2771;
    margin: 0;
}

span.texto {
    display: flex;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    text-align: justify;
}
</style>