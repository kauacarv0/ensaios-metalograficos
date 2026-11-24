'use client'
import {useEffect,useMemo,useState} from 'react'
import * as XLSX from 'xlsx'
import {createClient} from '@supabase/supabase-js'
const db=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
const ELEMENTS=['C','Si','Mn','P','S','Cr','Ni','Mo','Cu','Ti','Pb','B','Al','Sn','V','Sb','Nb','N','Fe','Ceq']
const norm=(v:any)=>String(v??'').trim()
const num=(v:any)=>{const n=parseFloat(norm(v).replace(',','.').replace(/^</,''));return Number.isFinite(n)?n:null}
const avg=(a:any[])=>{const x=a.filter(v=>v!=null);return x.length?x.reduce((p,v)=>p+v,0)/x.length:null}
const fmt=(v:any)=>v==null?'â':Number(v).toFixed(3)
const fmtMetric=(v:any)=>v==null?'â':Number(v).toFixed(2)
const col=(v:string)=>v.toLowerCase().replace(/[^a-z0-9]/g,'')
function findValue(rows:any[][],label:string){for(const row of rows)for(let c=0;c<row.length;c++){if(norm(row[c]).toUpperCase()===label.toUpperCase()){for(let k=1;k<=8;k++)if(norm(row[c+k]))return norm(row[c+k])}}return ''}
async function readChem(file:File){const wb=XLSX.read(await file.arrayBuffer(),{type:'array'});const rows=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{header:1,raw:true}) as any[][];const chem:any={};for(let r=1;r<rows.length;r++){const headers=rows[r-1]||[];if(norm(rows[r]?.[0]).toUpperCase()==='VALOR MEDIO'){headers.forEach((h:any,c:number)=>{const e=ELEMENTS.find(x=>x.toUpperCase()===norm(h).toUpperCase());if(e)chem[col(e)]=num(rows[r][c])});break}}return{corrida¶»§q«^